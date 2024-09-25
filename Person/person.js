const Account = require("../Account/account.js");

class Person{

    static accountID = 0;

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

}

module.exports = Person;


//sigleton trategy factory composite