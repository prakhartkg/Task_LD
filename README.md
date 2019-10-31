# Liquidity Digital Test Assignment Task

## Steps to run on local
- Clone the repo.
- Install `Node ^10.9`,
- Install `Mongodb` on local server
- Start `mongodbs` Server
- Run `npm install` to install all npm pakages
- Run `npm start` to start application or Run `npm run dev` to start application with nodemon

## Steps to run using docker compose
- Install and start docker
- sudo docker-compose -f "docker-compose.yml" up -d --build
- Docker Run will copy `.env` file from `setup` folder to `src`. and `setup.sh` file will put all env from global enviroment variables currently its not conifgured.
-It will spin up two containers one for mongo and another for the app. which will expose on 9000 port

## Execute test cases
-Need to start mongo server first
-Test cases will be executed with testDb and before each run db will be re initialized
-Go to src dir
-RUn `npm install`
-Run `npm run test:all` will execute all unit as well as integration test cases.
-To check code coverage goto `src/coverage` folder and open `index.html` file

## PostMan collection 
-`https://www.getpostman.com/collections/d5243cc6aa90877b6617`

## User Credential for login
-` logonid: prakhartkg@gmail.com password: admin123`

> PORT 9000