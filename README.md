# Blockchain lightweight simulation
    Simple blockchain simulation, based on partial structure of a real blockchain.
    some properties of a real blockchain exist, e.g hash pointers between blocks, greedy
    transactions aggregation loop, while some do not, e.g proof of membership for transactions
    with merkle trees, refernce to balances by transactions.
## Installation
    - $ git clone && cd
    - $ npm install
## Usage - web API
    - $ npm run -> The server simulating the entire blockchain will be running on port 3000
    - In order to initalize the blockchain with balances and transactions, 
      send the following post request (use postman!) to `http://localhost:3000/api/v1/init`
      with header field 'content-type: application/json' and body (example)
    {
    	"balances": Array<Integer>,
    	"transactions": Array<Array<Integer>>,
	    "blockSize": <Integer>
    }
## Examples
```bash
curl -X POST \
  http://localhost:3000/api/v1 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 70fcb0b3-cd43-4c39-8e66-572eca507d3e' \
  -H 'cache-control: no-cache' \
  -d '{
	"balances": [100, 150, 500, 0, 100],
	"transactions": [[0, 1, 50], [0, 2, 50], [0, 3, 50], [0, 3, 5], [1, 0, 100], [4, 3, 35]],
	"blockSize": 3
}'
```
## Tests
