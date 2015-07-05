defmodule YasaPhoenix.Connection do
	def start_link do
		conn = RethinkDB.Connection.connect [name: :yasa_development]
		Agent.start_link(fn -> conn end, name: __MODULE__)
		{:ok, self}
	end

	def run(query) do
		Agent.get(__MODULE__, fn conn ->
			query |>
			RethinkDB.run conn
		end)
	end
end
