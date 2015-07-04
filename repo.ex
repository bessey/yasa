defmodule YasaPhoenix.Repo do
  def start_link do
    conn = RethinkDB.local_connection
    Agent.start_link(fn -> conn end, name: __MODULE__)
    {:ok, self}
  end

  def run(query) do
    Agent.get(__MODULE__, fn conn ->
      RethinkDB.run conn, query
    end)
  end
end
