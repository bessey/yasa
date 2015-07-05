defmodule YasaPhoenix.TeamChannel do
  use Phoenix.Channel
  alias YasaPhoenix.Connection
  alias RethinkDB.Query, as: Q

  def join("teams:mine", auth_msg, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  def join("teams:" <> _private_room_id, _auth_msg, socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_info(:after_join, socket) do
    query = Q.db("yasa_development")
      |> Q.table("teams")
      |> Q.get("61520e8d-03c8-43f4-afcc-a75f1c416b9c")

    push_result(query, socket)

    changes = Q.changes(query)
      |> Connection.run

    Task.async fn ->
      Enum.each(changes, fn _change ->
        push_result(query, socket)
      end)
    end

    {:noreply, socket}
  end

  defp push_result(query, socket) do
    results = query |> Connection.run
    push socket, "data", %{data: results.data}
  end

end
