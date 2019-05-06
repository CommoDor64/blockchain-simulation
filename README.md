# Blockchain lightweight simulation
    Simple blockchain simulation, based on partial structure of a real blockchain.
    some properties of a real blockchain exist, e.g hash pointers between blocks, greedy
    transactions aggregation loop, while some do not, e.g proof of membership for transactions
    with merkle trees, refernce to balances by transactions.
## Installation
    - $ git clone https://github.com/CommoDor64/blockchain-simulation.git && cd block-simulation
    - $ npm install
## Usage - web API
    ```$ npm run``` 
    
    - In order to initalize the blockchain with balances and transactions, 
      send the following post request (use postman!) to `http://localhost:3000/api/v1/init`
      with header field 'content-type: application/json' and body (example)
    {
    	"balances": Array<Integer>,
    	"transactions": Array<Array<Integer>>,
	    "blockSize": <Integer>
    }
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
