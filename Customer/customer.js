const Account = require("../Account/account.js")

class Customer{
    static customer_id = 0;
    static Allusers = [];
    static AllAdmins = [];

    constructor(customer_id , fullName , age , gender , isAdmin, accounts){
        this.customer_id = customer_id;
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.isAdmin = isAdmin;
        this.accounts = accounts;
    }

    static createAdminAccount(firstName , lastName ,  age , gender){
        try {
            if(typeof firstName != "string"){
                throw new Error("firstname is invalid");
            }
    
            if(typeof lastName != "string"){
                throw new Error("lastname is invalid");
            }

            if(typeof age != "number"){
                throw new Error("age is invalid");
            }

            if(typeof gender != "string"){
                throw new Error("gender is invalid");
            }
    
            let fullName = firstName + " " + lastName;

            let newAdmin = new Customer(++Customer.customer_id , fullName , age , gender, true , []);

            Customer.AllAdmins.push(newAdmin);

            return newAdmin;
    
        } catch (error) {
            console.log(error);
        }

    }

    createBank(bankName , abbreviation){
        try {
            return Account.newBank(bankName , abbreviation);
        } catch (error) {
            console.log(error);
        }
    }

    createCustomer(bankName , firstName , lastName, age , gender){
        try {
            if(typeof firstName != "string"){
                throw new Error("firstname is invalid");
            }
    
            if(typeof lastName != "string"){
                throw new Error("lastname is invalid");
            }

            if(typeof age != "number"){
                throw new Error("age is invalid");
            }

            if(typeof gender != "string"){
                throw new Error("gender is invalid");
            }

            let fullName = firstName + " " + lastName;

            let customer_id = ++Customer.customer_id;

            let newAccount = Account.newAccount(customer_id , bankName);

            let accounts = [];

            accounts.push(newAccount);


            let newCustomer = new Customer(customer_id , fullName , age , gender  , false , accounts);

            Customer.Allusers.push(newCustomer);

            return newCustomer;

            
        } catch (error) {
            console.log(error);
        }
    }

    //create another accounr
    creteAnotherAccount(customer_id , bankName){
        try {
            if(typeof customer_id != "number"){
                throw new Error("customer id is invalid.")
            }
            if(!this.isAdmin){
                throw new Error("customer cannot create account")
            }
            let reqCustomer = this.getCustomerById(customer_id);
            
            let newAccount = Account.newAccount(customer_id , bankName);
            reqCustomer.accounts.push(newAccount);
        } catch (error) {
            console.log(error);
        }

    }

    getCustomerById(id){
        try {
           for(let i=0; i<Customer.Allusers.length; i++){
              if(Customer.Allusers[i].customer_id == id){
                return Customer.Allusers[i];
              }
              return null;
           } 
        } catch (error) {
            console.log(error);
        }
    }

    getBankById(id){
        try {
           return Account.getBankById(id); 
        } catch (error) {
            console.log(error);
        }
    }

    getTotalBalance(){
        try {
            let reqCustomer = this.getCustomerById(this.customer_id);
            let totalBalance = 0;
            
            for(let i=0; i<reqCustomer.accounts.length; i++){
                totalBalance += reqCustomer.accounts[i].getBalance();
            }
            return totalBalance;
        } catch (error) {
            console.log(error);
        }
    }

    getAccountByAccountNumber(accountNumber){
        try {
            Account.validateAccountNumber(accountNumber);
            let reqCustomer = this.getCustomerById(this.customer_id);
            for(let i=0; i<reqCustomer.accounts.length; i++){
                if(reqCustomer.accounts[i].getAccoutNumber() === accountNumber){
                    return reqCustomer.accounts[i];
                }
            }
            console.log("account is not exist in bank , create new");
            return null;
        } catch (error) {
            console.log(error);
        }
    }

    getBalanceByAccountNumber(accountNumber){
        try {
            Account.validateAccountNumber(accountNumber);
            let account = this.getAccountByAccountNumber(accountNumber);
            return account.getBalance();
        } catch (error) {
            console.log(error);
        }
    }

    depositeMoney(accountNumber , amount){
        try {
            Account.validateAccountNumber(accountNumber);
            let reqAccount = this.getAccountByAccountNumber(accountNumber);
            reqAccount.depositeMoney(amount);

        } catch (error) {
            console.log(error);
        }
    }

    withdrawMoney(accountNumber , amount){
        try {
            Account.validateAccountNumber(accountNumber);
            let reqAccount = this.getAccountByAccountNumber(accountNumber);
            reqAccount.withdrawMoney(amount);

        } catch (error) {
            console.log(error);
        }
    }

    transferMoney(selfAccountNumber , targetAccountNumber , amount){
        try {
            Account.validateAccountNumber(selfAccountNumber);
            Account.validateAccountNumber(targetAccountNumber);

            let sourceAccount = this.getAccountByAccountNumber(selfAccountNumber);
            let targetAccount = this.getAccountByAccountNumber(targetAccountNumber);
           
            if (!sourceAccount) {
                throw new Error(`Source account ${selfAccountNumber} not found.`);
            }
            if (!targetAccount) {
                throw new Error(`Target account ${targetAccountNumber} not found.`);
            }
            sourceAccount.withdrawMoney(amount);
            targetAccount.depositeMoney(amount);
            console.log(amount,"Rs" , "transferred from" , selfAccountNumber , "to" , targetAccountNumber);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Customer;