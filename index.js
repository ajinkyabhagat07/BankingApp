const Bank = require("./Bank/bank.js");

let cust1 = Bank.createAccount("Ajinkya" , "bhagat" , 22);


let cust2 = Bank.createAccount("Avi" , "bhagat" , 21);


// cust1.deposite(1001 , 1000);
// cust1.getTotalBalance(1001);

// cust1.createAnotherAccount();

console.log(JSON.stringify(cust1 , null , 2));
console.log(JSON.stringify(cust2 , null , 2));

// // console.log(cust1.getTotalBalance(1001));

// console.log(cust1.getTotalBalanceAllAccount());

// cust1.withdraw(1001 , 100);


cust1.tranferMoney(1001 , 1002 , 100);

// console.log(cust2.getTotalBalanceAllAccount());

console.log(cust1.getTotalBalance(1001));

