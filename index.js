const Customer = require("./Customer/customer.js");

let admin = Customer.createAdminAccount("Ajinkya" , "bhagat" , 23 , "male");


const sbi = admin.createBank("state bank of india" , "SBI");

const cbi = admin.createBank("central Bank of india" , "CBI");

let cust1 = admin.createCustomer("SBI" , "Avi" , "bhagat" , 21 , "male");

cust1.createAnotherAccount("CBI");




cust1.transferMoney(1001 , 1002 , 200);
cust1.transferMoney(1002 , 1001 , 180);

console.log(admin.getBankById(1));
console.log(admin.getBankById(2));


console.log(admin.getLedger("CBI"));