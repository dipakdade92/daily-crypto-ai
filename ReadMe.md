# Book Management App - Backend

## put your env file in this below is my env file if need to do changes replace credentials accordingly
NODE_ENV =development 
JWT_SECRET =afgsdjryyhwtysrdhbaesgsrdjtth
MONGODB_URI =mongodb://localhost:27017/daily-crypto-task
PORT =8000

## Install packages with 
- **npm install**

## Saparate status file that is status.ts
- all status are keep here and import in the file >>utils >> status.ts

## Saparate Messages file that is message.json
- all messages are keep here and import in the file >>src >> config>> message.json

## In tsconfig.json added below code
"resolveJsonModule": true,
"esModuleInterop": true,
"allowSyntheticDefaultImports": true

## installed joi package
- "joi": "^17.13.3",

 ## Run Backend Code
 - npm run dev
