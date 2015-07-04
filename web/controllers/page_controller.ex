defmodule YasaPhoenix.PageController do
  use YasaPhoenix.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
