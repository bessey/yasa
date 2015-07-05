defmodule YasaPhoenix.TeamChannel do
  def join("teams:mine", auth_msg, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  use YasaPhoenix.TableChannel

  defp table_query do
    Q.db("yasa_development")
      |> Q.table("teams")
      |> Q.get("61520e8d-03c8-43f4-afcc-a75f1c416b9c")
  end

end
