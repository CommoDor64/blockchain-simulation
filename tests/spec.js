var mocha = require("mocha");
var assert = require("assert");
var fetch = require("node-fetch");
const app = require('../app');
let server; 
const testObj = {
  balances: [100, 150, 500, 0, 100],
  transactions: [
    [0, 1, 50],
    [0, 2, 50],
    [0, 3, 50],
    [0, 3, 5],
    [1, 0, 100],
    [4, 3, 35],
    [3, 4, 10]
  ],
  blockSize: 3
};
//  fire server
before(done => {
  server = app.listen(3000, done);
});

// test empty blockchain before initializing blockchain
describe("#index", function() {
  it("response with code 400", async function() {
    const response = await fetch("http://localhost:3000/api/v1/");
    const responseJson = await response.json();
    assert.equal(responseJson.code, 400);
  });
});

//test balances before initializing blockchain
for(let i = 0; i<testObj.balances.length; i++) {
  describe("#balance", function() {
    it("response with code 400", async function() {
      const response = await fetch(`http://localhost:3000/api/v1/balance/${i}`);
      const responseJson = await response.json();
      assert.equal(responseJson.code, 400);
    });
  });
}

// initializing blockchain
describe("#init", function() {
  beforeEach(async function() {
    let response = await fetch("http://localhost:3000/api/v1/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(testObj)
    });
  });
  it("response with code 200", async function() {
    const response = await fetch("http://localhost:3000/api/v1/");
    const responseJson =await response.json();
    assert.equal(responseJson.code, 200);
  });
});

//test blockchain after initalization
describe("#index", function() {
  it("response with code 200", async function() {
    const response = await fetch("http://localhost:3000/api/v1/");
    const responseJson = await response.json();
    assert.equal(responseJson.code, 200);
  });
});

//test balances after initialization
for(let i = 0; i<testObj.balances.length; i++) {
  describe("#balance", function() {
    it("response with code 200", async function() {
      const response = await fetch(`http://localhost:3000/api/v1/balance/${i}`);
      const responseJson = await response.json();
      assert.equal(responseJson.code, 200);
    });
  });
}

//kill server
after(done => {
  server.close(done);
});
