const Bank = require("./Bank/bank.js");

let cust1 = Bank.createAccount("Ajinkya" , "bhagat" , 22);
cust1.createAnotherAccount();
let cust2 = Bank.createAccount("Avi" , "bhagat" , 21);

console.log(JSON.stringify(cust1 , null , 2));
console.log(JSON.stringify(cust2 , null , 2));

