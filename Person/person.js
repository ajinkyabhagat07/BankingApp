const Account = require("../Account/account.js");

class Person{

    static accountID = 0;
    static Allaccounts = [];

    constructor(personID , personName , age , accounts ){
        this.personID = personID;
        this.personName = personName;
        this.personAge = age;
        this.accounts = accounts;

    }

    static createAccount(personID , firstName , lastName , age){
        try {
            if(typeof personID != "number"){
                throw new Error("id is invalid")
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

            let fullName = firstName + " " + lastName;

            if(age < 18){
                throw new Error("age should greater than 18");
            }
            let accounts = [];
            let newAccount = Account.newAccount(++Person.accountID);
            accounts.push(newAccount);
            Person.Allaccounts.push(newAccount);
            return new Person(personID , fullName , age , accounts)


        } catch (error) {
            throw error;
        }
    }

    createAnotherAccount(){
        try {
            let account = Account.newAccount(++Person.accountID);
            this.accounts.push(account);
        } catch (error) {
            throw error;
        }
    }

    getPerson(){
        return this.personID;
    }

    findAccount(accountNumber){
       
        try {
           
            for(let i=0; i<Person.accountID; i++){
                if(Person.Allaccounts[i].getAccountNumber() == accountNumber){
                    return Person.Allaccounts[i];
                }
            }
    
            return null;
            
        } catch (error) {
            throw error;
        }
    }

    depositeMoney(accountNumber,amount){
        try {
            Account.validateAccountNumber(accountNumber);
            
            let getAccount = this.findAccount(accountNumber);
            
            getAccount.depositeMoney(amount);
        } catch (error) {
            throw error;
        }
    }

    getTotalBalance(accountNumber){
        try {
            Account.validateAccountNumber(accountNumber);

            let getAccount = this.findAccount(accountNumber);
            let balance = getAccount.getTotalBalance();
            return balance;
        } catch (error) {
            throw error;
        }
    }

    getTotalBalanceAllAccount(){
        try {
            let total = 0;
            for(let i=0; i<this.accounts.length; i++){
                total += this.accounts[i].getAmount();
            }
            return total;
        } catch (error) {
            throw error;
        }
    }

    withdrawMoney(accountNumber , amount){
        try {
            Account.validateAccountNumber(accountNumber);
            let reqAccount = this.findAccount(accountNumber);
            reqAccount.withdrawMoney(amount);
        } catch (error) {
            throw error;
        }
    }

    tranferMoney(sourceAccountNumber, targetAccountNumber, amount){
        try {
            Account.validateAccountNumber(sourceAccountNumber);
            Account.validateAccountNumber(targetAccountNumber);
            let sourceAccount = this.findAccount(sourceAccountNumber);
            let targetAccount = this.findAccount(targetAccountNumber);
           
            if (!sourceAccount) {
                throw new Error(`Source account ${sourceAccountNumber} not found.`);
            }
            if (!targetAccount) {
                throw new Error(`Target account ${targetAccountNumber} not found.`);
            }

            sourceAccount.withdrawMoney(amount);
            targetAccount.depositeMoney(amount);
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Person;


//sigleton trategy factory composite