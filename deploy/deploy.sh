date > last-deploy
docker-compose pull
docker-compose up --remove-orphans -d
docker system prune -f
docker-compose ps
echo "Up $(tput setaf 2)$(docker-compose ps | grep Up | wc -l)$(tput sgr 0) containers!"