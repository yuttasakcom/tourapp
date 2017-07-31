# Tourapp

## Install
1. git clone git@bitbucket.org:paiboon15721/tourapp.git
2. cd tourapp/client/agent-web
3. npm install
4. npm run build
5. cd tourapp/client/company-web
6. npm install
7. npm run build
8. cd tourapp
9. docker-compose build
10. docker-compose up
11. set file hosts to 
127.0.0.1 tourapp agent.tourapp company.tourapp api.tourapp
ถ้าใช้ docker-machine ให้เช็ค ip ด้วย docker-machine ip

ระบบฝั่ง agent url https://agent.tourapp

ระบบฝั่ง company url https://company.tourapp

ตัวระบบยังเป็น self sign อยู่ทั้งหมด ต้องเลือก advanced และเลือก procees to .........(unsafe) ก่อน

รวมถึง https://api.tourapp ด้วย