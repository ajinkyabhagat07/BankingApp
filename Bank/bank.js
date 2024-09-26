const { accountNumber } = require("../Account/account.js");
const Person = require("../Person/person.js")

class Bank{

    static personID = 0;
    static persons = [];

    constructor(person){
        this.person = person;
    }


    static createAccount(firstName , lastName , age){

        try {
            let newPerson = Person.createAccount(++Bank.personID, firstName, lastName, age);
            Bank.persons.push(newPerson);  
            return new Bank(newPerson);
        } catch (error) {
            console.log(error);
        }


    }

    

    createAnotherAccount(){
        try {
            this.person.createAnotherAccount();
        } catch (error) {
            console.log(error);
        }
    }

    deposite(accountNumber , amount){
        try {
            this.person.depositeMoney(accountNumber ,  amount);
            console.log(amount , "deposited successfully in" , accountNumber );
        } catch (error) {
            console.log(error);
        }
    }
    getTotalBalanceAllAccount(){
        try {
           return this.person.getTotalBalanceAllAccount(); 
        } catch (error) {
            throw error;
        }
    }

    getTotalBalance(accountNumber){
        try {
            return this.person.getTotalBalance(accountNumber);
        } catch (error) {
            console.log(error);
        }
    }

    withdraw(accountNumber , amount){
        try {
            this.person.withdrawMoney(accountNumber , amount);
            console.log(amount , "withdrawl succesfull from" , accountNumber);
        } catch (error) {
            console.log(error);
        }
    }

    tranferMoney(sourceAccountNumber, targetAccountNumber, amount){
        try {
            this.person.tranferMoney(sourceAccountNumber, targetAccountNumber, amount);
            console.log(`Transferred Rs.${amount} from account ${sourceAccountNumber} to account ${targetAccountNumber}.`);
        } catch (error) {
            console.log(error);
        }
    }

    
}

module.exports = Bank;