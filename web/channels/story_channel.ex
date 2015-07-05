defmodule YasaPhoenix.StoryChannel do
  def join("stories:mine", auth_msg, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  use YasaPhoenix.TableChannel

  defp table_query do
    Q.db("yasa_development")
      |> Q.table("stories")
  end
end
