# Blockchain lightweight simulation
Simple blockchain simulation, based on partial structure of a real blockchain.
some properties of a real blockchain exist, e.g **hash pointers between blocks, greedy
transactions aggregation loop**, while some do not, e.g **proof of membership for transactions
with merkle trees, refernce to balances by transactions**.

# API:
**I have let myself take it up a notch and upgrade the demanded interface**
1) init(initialBalances, transactions, blockSize) is exposed via POST http://localhost:3000/api/v1/init
2) getAccountBalance(accountId) is exposed via GET http://localhost:3000/api/v1/balance/{id}

## Installation
```$ git clone https://github.com/CommoDor64/blockchain-simulation.git && cd block-simulation```
```$ npm install```
    
## Usage
### Run
```$ npm run``` 

## Examples
### Initalize a new blockchain
```bash
curl -X POST \
  http://localhost:3000/api/v1/init \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"balances": [100, 150, 500, 0, 100],
	"transactions": [[0, 1, 50], [0, 2, 50], [0, 3, 50], [0, 3, 5], [1, 0, 100], [4, 3, 35]],
	"blockSize": 3
}'
```
### Response
```bash
{"message":"blockchain is set","code":200}
```
### Get balance by ID 
```
curl -X GET http://localhost:3000/api/v1/balance/0
```

### Response 
```
{
    "data": {
        "account_0": 45
    },
    "code": 200
}
```

### Get blockchain information
```bash
curl -X GET http://localhost:3000/api/v1
```
OR
```open browser on: http://localhost:3000/api/v1``` 

### Response
```bash
{
    "data": [
        {
            "blockHash": "12341f58b3b3410c9cf4699048b7e1a6b42c5bfe",
            "prevBlockHash": "12346c55829623cbd08ac9819a74cf47db8cf1f4",
            "nonce": 71223,
            "blockTransactions": [
                [
                    0,
                    3,
                    50
                ]...
            ]
        }...
    ]
```
## Tests
kill server if running as the test suite runs a the server itself.
```bash
$ npm test
```

## Project structure
- /bin: server config
- /controllers: actions class for each route.
- /middlewares: mainly request validation.
- /models: data object modeling, in this case.
Block and Blockchain the implementation of the blockchain is in Blockchain.js and Block.js
- /public: stylesheets for error html pages.
- /routs
- /tests
- /view: mainly html error pages fro browser.

## Notes:
1) there is no .env file fore practical reasons, so it'll be faster for you to run
2) error 500 for server issue, 400 for wrong request, and 200 OK
3) test on node version 11.14.0

