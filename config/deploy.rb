# config valid only for Capistrano 3.1
lock '3.2.1'

set :application, 'yasa'
set :repo_url, 'git@github.com:bessey/yasa.git'
set :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call
set :tmp_dir, '/home/deploy/.tmp/'
set :deploy_to, '/var/www/yasa'

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

set :bower_roles, :app
set :bower_flags, '--allow-root --quiet --config.interactive=false'

set :linked_dirs, %w{node_modules bower_components dist}

# Default value for default_env is {}
set :default_env, {
  'BROCCOLI_ENV' => 'production'
}


namespace :deploy do
  desc 'Build application'
  task :build do
    on roles(:app) do
      execute "cd #{release_path} && grunt build"
    end
  end
  after :updated, :build

  namespace :nginx do
    task :configure do
      on roles(:app) do
        execute "sudo cp -f #{release_path}/config/templates/nginx.conf /etc/nginx/"
      end
    end
  end
  after :updated, 'nginx:configure'

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute 'sudo restart yasa'
    end
  end
  after :publishing, :restart

end
