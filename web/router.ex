defmodule YasaPhoenix.Router do
  use YasaPhoenix.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :proxy do
    plug Proxy
  end

  scope "/", YasaPhoenix do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", YasaPhoenix do
    pipe_through :api
  end

  socket "/ws", YasaPhoenix do
    channel "teams:*", TeamChannel
    channel "stories:*", StoryChannel
  end
end
