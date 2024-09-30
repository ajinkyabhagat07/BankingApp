const Account = require("../Account/account.js")

class Customer{
    static customerId = 0;
    static Allusers = [];
    static AllAdmins = [];

    constructor(customerId , firstName , lastName , fullName , age , gender , isAdmin, accounts , isActive){
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.isAdmin = isAdmin;
        this.accounts = accounts;
        this.isActive = isActive;
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

            let newAdmin = new Customer(++Customer.customerId ,firstName , lastName, fullName , age , gender, true , [] , true);

            Customer.AllAdmins.push(newAdmin);

            return newAdmin;
    
        } catch (error) {
            console.log(error);
        }

    }

    createBank(bankName , abbreviation){
        try {
            if(!this.isAdmin){
                throw new Error("only admin can create bank")
            }
            return Account.newBank(bankName , abbreviation);
        } catch (error) {
            console.log(error);
        }
    }

    createCustomer(bankName , firstName , lastName, age , gender){
        try {
            if(!this.isAdmin){
                throw new Error("only admin can create customers")
            }
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

            let customerId = ++Customer.customerId;

            let newAccount = Account.newAccount(customerId , bankName);

            let accounts = [];

            accounts.push(newAccount);


            let newCustomer = new Customer(customerId ,firstName , lastName, fullName , age , gender  , false , accounts , true);

            Customer.Allusers.push(newCustomer);

            return newCustomer;

            
        } catch (error) {
            console.log(error);
        }
    }

    //create another accounr
    createAnotherAccount(bankName){
        try {
            
            if(typeof this.customerId != "number"){
                throw new Error("customer id is invalid.")
            }
            if(!this.isActive){
                throw new Error("customer is inactive")
            }
            let newAccount = Account.newAccount(this.customerId , bankName);
            this.accounts.push(newAccount);
        } catch (error) {
            console.log(error);
        }

    }

    static getCustomerById(id){
        try {
           for(let i=0; i<Customer.Allusers.length; i++){
              if(Customer.Allusers[i].customerId == id){
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
            if(!this.isAdmin){
                throw new Error("only admin can get bank")
            }
           return Account.getBankById(id); 
        } catch (error) {
            console.log(error);
        }
    }

    updateUserById(customerId , parameterToUpdate , value){
        try {
            if(!this.isAdmin){
                throw new Error("only admin can update customers")
            }
            if(typeof customerId != "number"){
                throw new Error("id is invalid");
            }
            if(typeof parameterToUpdate != "string"){
                throw new Error("parameter is invalid")
            }
            let reqCustomer = Customer.getCustomerById(customerId);
    
            switch(parameterToUpdate){
                case "firstName":
                    reqCustomer.updateFirstName(value);
                    break;
                case "lastName":
                    reqCustomer.updateLastName(value);
                    break;
                case "age" :
                    reqCustomer.upadateAge(value);
                    break;
                default:
                    throw new Error("parameter is invalid");
            }
        } catch (error) {
            console.log(error);
        }
    }

    updateFirstName(value){
        try {
            if(typeof value != "string"){
                throw new Error("value is invalid")
            }
            this.fullName = value + " " + this.lastName;
        } catch (error) {
            console.log(error);
        }
    }

    updateLastName(value){
        try {
            if(typeof value != "string"){
                throw new Error("value is invalid")
            }
            this.fullName = this.firstName + " " + value;
        } catch (error) {
            console.log(error);
        }
    }

    upadateAge(value){
        try {
            if(typeof value != "number"){
                throw new Error("value is invalid")
            }
            this.age = value;
        } catch (error) {
           console.log(error); 
        }
    }

    updateBankById(id , parameter , value){
        try {
            Account.updateBankById(id , parameter , value)
        } catch (error) {
            console.log(error);
        }
    }

    deleteAccountByAccountNumber(customerId, accountNumber){
        try {
            if(!this.isAdmin){
                throw new Error("only admin can delete account")
            }
            let reqCustomer = Customer.getCustomerById(customerId);
            let reqAccountNumber = reqCustomer.getAccountByAccountNumber(accountNumber);
            reqAccountNumber.deleteAccount();

        } catch (error) {
           throw error; 
        }
    }

    deleteBank(bankId){
        try {
            if(!this.isAdmin){
                throw new Error("only admin can delete bank")
            }
            Account.deleteBank(bankId);
        } catch (error) {
           console.log(error); 
        }
    }

    isActiveAccounts(){
        try {
            for(let i=0; i<this.accounts.length; i++){
                if(this.accounts[i].isActive === true){
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    deleteCustomer(customer_id){
        try {
            if(!this.isAdmin){
                throw new Error("only admin can delete customers")
            }
            let reqCustomer = Customer.getCustomerById(customerId);
            //console.log(reqCustomer);
            if(reqCustomer.isActiveAccounts()){
                throw new Error("Customer contains active accounts , cant delete it ..")
            }
            reqCustomer.isActive = false;
            
        } catch (error) {
            console.log(error);
        }
    }

    getTotalBalance(){
        try {
            if(!this.isActive){
                throw new Error("customer is not active")
            }
            let reqCustomer = this.getCustomerById(this.customerId);
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
            let reqCustomer = Customer.getCustomerById(this.customerId);
            for(let i=0; i<reqCustomer.accounts.length; i++){
                if(reqCustomer.accounts[i].getAccoutNumber() === accountNumber && reqCustomer.accounts[i].isActive){
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
            if(!this.isActive){
                throw new Error("customer is not active")
            }
            Account.validateAccountNumber(accountNumber);
            let account = this.getAccountByAccountNumber(accountNumber);
            return account.getBalance();
        } catch (error) {
            console.log(error);
        }
    }

    depositeMoney(accountNumber , amount){
        try {
            if(!this.isActive){
                throw new Error("customer is not active")
            }
            Account.validateAccountNumber(accountNumber);
            let reqAccount = this.getAccountByAccountNumber(accountNumber);

            reqAccount.depositeMoney(amount);

        } catch (error) {
            console.log(error);
        }
    }

    withdrawMoney(accountNumber , amount){
        try {
            if(!this.isActive){
                throw new Error("customer is not active")
            }
            Account.validateAccountNumber(accountNumber);
            let reqAccount = this.getAccountByAccountNumber(accountNumber);
            reqAccount.withdrawMoney(amount);

        } catch (error) {
            console.log(error);
        }
    }

    transferMoney(selfAccountNumber , targetAccountNumber , amount){
        try {
            if(!this.isActive){
                throw new Error("customer is not active")
            }
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
            sourceAccount.transferMoney(targetAccount ,amount);
            console.log(amount,"Rs" , "transferred from" , selfAccountNumber , "to" , targetAccountNumber);
        } catch (error) {
            console.log(error);
        }
    }

    getPassBook(id , accountNumber){
        try {
            if(!this.isAdmin){
                throw new Error("only admin can acces passbook")
            }
            Account.validateAccountNumber(accountNumber);
            let reqCustomer = null;
            
            for(let i=0; i<Customer.customerId; i++){
                if(Customer.Allusers[i].customerId == id){
                    reqCustomer =  Customer.Allusers[i];
                    break;
                }
            }

            if(!reqCustomer.isActive){
                throw new Error("customer is not active")
            }
            
            let reqAccount = null;
            for(let i=0; i<reqCustomer.accounts.length; i++){
                if(reqCustomer.accounts[i].accountNumber === accountNumber){
                    reqAccount = reqCustomer.accounts[i];
                }
            }

            if(!reqAccount.isActive){
                throw new Error("account is inactive")
            }
            
            return reqAccount.getPassBook();
        } catch (error) {
           console.log(error); 
        }
    }

    getLedger(bankName){
        try {
            return Account.getLedger(bankName);
        } catch (error) {
           console.log(error); 
        }
    }
}

module.exports = Customer;