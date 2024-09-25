const Person = require("../Person/person.js")

class Bank{

    static personID = 0;
    static persons = [];

    constructor(person){
        this.person = person;
    }


    static createAccount(firstName , lastName , age){

        try {
            console.log();
            let newPerson = Person.createAccount(++Bank.personID, firstName, lastName, age);
            Bank.persons.push(newPerson);  
            return new Bank(newPerson);
        } catch (error) {
            console.log(error);
        }


    }

    getPerson(id){
        for(let i=0; i<Bank.persons.length; i++){
            if(Bank.persons[i].getPerson() == id){
                return Bank.persons[i];
            }
        }
    }

    createAnotherAccount(){
        try {
            let cuurentPerson = this.getPerson(this.id);
            cuurentPerson.createAnotherAccount();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Bank;