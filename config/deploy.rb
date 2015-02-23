# config valid only for Capistrano 3.1
lock '3.2.1'

set :application, 'yasa'
set :repo_url, 'git@github.com:bessey/yasa.git'
set :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app
# set :deploy_to, '/var/www/my_app'

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

set :bower_roles, :app
set :bower_flags, '--allow-root --quiet --config.interactive=false'

set :linked_dirs, %w{node_modules bower_components}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# namespace :deploy do
#
#   desc 'Restart application'
#   task :restart do
#     on roles(:app), in: :sequence, wait: 5 do
#       # Your restart mechanism here, for example:
#       # execute :touch, release_path.join('tmp/restart.txt')
#     end
#   end
#
#   after :publishing, :restart
#
#   after :restart, :clear_cache do
#     on roles(:web), in: :groups, limit: 3, wait: 10 do
#       # Here we can do anything such as:
#       # within release_path do
#       #   execute :rake, 'cache:clear'
#       # end
#     end
#   end
#
# end
