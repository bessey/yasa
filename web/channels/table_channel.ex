defmodule YasaPhoenix.TableChannel do
  defmacro __using__(_) do
    quote do
      use Phoenix.Channel
      alias YasaPhoenix.Connection
      alias RethinkDB.Query, as: Q

      def handle_info(:after_join, socket) do
        query = table_query
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

      def join(_other_channel, _auth_msg, socket) do
        {:error, %{reason: "unauthorized"}}
      end
    
      defp push_result(query, socket) do
        results = query |> Connection.run
        push socket, "data", %{data: results.data}
      end
    end
  end
end
