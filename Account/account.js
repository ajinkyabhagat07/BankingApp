const Passbook = require("../Passbook/passbook.js");
const Bank = require("../Bank/bank.js")

class Account{


    static accountNumber = 1000;
    static accountID = 0;
    constructor(accountID , customer_id,bankName, accountNumber , amount){
        this.accountID = accountID;
        this.customer_id = customer_id;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.amount = amount;
    }

    static newAccount(customer_id , bankName){
        try {
            if(typeof bankName != "string"){
                throw new Error("bank is invalid");
            }
           
            let bank = Account.findBankByName(bankName);
            let newAccount =  new Account(++Account.accountID,customer_id , bankName, ++Account.accountNumber ,1000);
            bank.accounts.push(newAccount);
            return newAccount;
        
        } catch (error) {
            throw error;
        }
    }

    static findBankByName(bankName){
        try {
            for(let i=0; i<Bank.AllBanks.length; i++){
                if(Bank.AllBanks[i].getBankName() === bankName){
                    return Bank.AllBanks[i];
                }
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static newBank(bankName , abbreviation){
        try {
            return Bank.createBank(bankName , abbreviation)
        } catch (error) {
           throw error; 
        }
    }

    static getBankById(id){
        try {
            if(typeof id != "number"){
                throw new Error("id is invalid")
            }
            return Bank.getBankById(id);
        } catch (error) {
            throw error;
        }
    }
    getBalance(){
        try {
            return this.amount;
        } catch (error) {
            throw error;
        }
    }

    getAccoutNumber(){
        return this.accountNumber;
    }

    depositeMoney(amount){
        try {
            if(typeof amount != "number"){
                throw new Error("amount is invalid")
            }
            this.amount += amount; 
        } catch (error) {
            throw error;
        }
    }

     static validateAccountNumber(accountNumber){
        try {
            if(typeof accountNumber != "number"){
                throw new Error("account number is invalid")
            }
        } catch (error) {
           throw error; 
        }
    }

    withdrawMoney(amount){
        try {
            try {
                if(typeof amount != "number"){
                    throw new Error("amount is invalid")
                }
                this.amount -= amount; 
            } catch (error) {
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    

    // static validateAccountNumber(accountNumber){
    //     try {
    //         if(typeof accountNumber != "number"){
    //             throw new Error("account numbetr is invalid")
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // }


    // getAccountNumber(){
    //     return this.accountNumber;
    // }

    // depositeMoney(amount){
    //    try {
    //     if(typeof amount != "number"){
    //         throw new Error("amount is invalid");
    //     }
    //     this.amount += amount;
    //     let reqEntry = Passbook.addDetailsToPassBook("deposite" , amount , this.amount);
    //     this.passbook.push(reqEntry);
        
    //    } catch (error) {
    //      throw error;
    //    }
    // }

    // getTotalBalance(){
    //     return this.amount;
    // }

    // getAmount(){
    //     return this.amount;
    // }

    // withdrawMoney(amount){
    //     try {
    //         if(this.amount < amount){
    //             throw new Error("Insufficient funds")
    //         }
    //         this.amount -= amount;
    //         let reqEntry = Passbook.addDetailsToPassBook("withdraw" , amount , this.amount);
    //         this.passbook.push(reqEntry);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

}

module.exports = Account;