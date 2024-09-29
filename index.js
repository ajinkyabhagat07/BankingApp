const Customer = require("./Customer/customer.js");

let Admin = Customer.createAdminAccount("Ajinkya" , "bhagat" , 23 , "male");


const sbi = Admin.createBank("state bank of india" , "SBI");

const cbi = Admin.createBank("central Bank of india" , "CBI");

let cust1 = Admin.createCustomer("SBI" , "Avi" , "bhagat" , 21 , "male");

Admin.creteAnotherAccount(2 , "SBI");




cust1.transferMoney(1001 , 1002 , 200);