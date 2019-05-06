# Blockchain lightweight simulation
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

