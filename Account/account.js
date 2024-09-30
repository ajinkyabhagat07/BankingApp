const Passbook = require("../Passbook/passbook.js");
const Bank = require("../Bank/bank.js")

class Account{


    static accountNumber = 1000;
    static accountID = 0;
    constructor(accountID , customerId,bankName, accountNumber , amount , passbook , isActive){
        this.accountID = accountID;
        this.customerId = customerId;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.passbook = passbook;
        this.isActive = isActive;
    }

    static newAccount(customerId , bankName){
        try {
            if(typeof bankName != "string"){
                throw new Error("bank is invalid");
            }
           
            let bank = Account.findBankByName(bankName);
            let newAccount =  new Account(++Account.accountID,customerId , bankName, ++Account.accountNumber ,1000 , [] , true);
            bank.accounts.push(newAccount);
            let newEntry = Passbook.addDetailsToPassBook('deposit', 1000, newAccount.amount);
            newAccount.passbook.push(newEntry);
            return newAccount;
        
        } catch (error) {
            throw error;
        }
    }

    static findBankByName(bankName){
        try {
            for(let i=0; i<Bank.AllBanks.length; i++){
                if(Bank.AllBanks[i].getBankName() === bankName && Bank.AllBanks[i].isActive){
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

    static updateBankById(id , parameter , value){
        try {
            Bank.updateBankById(id , parameter , value);
        } catch (error) {
            throw error;
        }
    }
    getBalance(){
        try {
            if(!this.isActive){
                throw new Error("account is inactive")
            }
            return this.amount;
        } catch (error) {
            throw error;
        }
    }

    getAccoutNumber(){
        return this.accountNumber;
    }

    deleteAccount(){
        try {
           this.isActive = false; 
        } catch (error) {
            throw error;
        }
    }

    static deleteBank(bankID){
        try {
            Bank.deleteBank(bankID);
        } catch (error) {
            throw error;
        }
    }

   


    depositeMoney(amount){
        try {
            if(typeof amount != "number"){
                throw new Error("amount is invalid")
            }
            this.amount += amount; 
            let newEntry = Passbook.addDetailsToPassBook('deposit', amount, this.amount);
            this.passbook.push(newEntry);
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
                if(this.amount < amount){
                    throw new Error("Insufficient funds");
                }
                this.amount -= amount; 
                let newEntry = Passbook.addDetailsToPassBook('withdraw', amount, this.amount);
                this.passbook.push(newEntry);
            } catch (error) {
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    transferMoney(targetAccount ,amount){
        try {

            if(this.amount < amount){
                throw new Error("Insufficient funds");
            }

            let originalSourceAmount = this.amount;
            let originalTargetAmount = targetAccount.amount;

            this.amount -= amount;
            targetAccount.amount += amount;
            let sourceBank = Bank.getBankByBankName(this.bankName);
            let targetBank = Bank.getBankByBankName(targetAccount.bankName);
            sourceBank.updateLedger(targetBank.bankId, targetBank.bankName , targetBank.abbreviation, -amount);
            targetBank.updateLedger(sourceBank.bankId , sourceBank.bankName ,sourceBank.abbreviation, amount);
            let newEntrySourceAccount = Passbook.addDetailsToPassBook(`Transferred  to Account ${targetAccount.accountNumber}` , amount , this.amount);
            let newEntryTargetAccount = Passbook.addDetailsToPassBook(`Received from Account ${this.accountNumber}`, amount, targetAccount.amount);
            this.passbook.push(newEntrySourceAccount);
            targetAccount.passbook.push(newEntryTargetAccount);
        } catch (error) {
            //rollback transaction
            this.amount = originalSourceAmount;
            targetAccount.amount = originalTargetAmount;
            throw error;
        }
    }

    getPassBook(){
        return this.passbook;
    }

    static getLedger(bankName){
        try {
            let foundBank = this.findBankByName(bankName);
            return foundBank.getLedger();
        } catch (error) {
            throw error;
        }
    }

    

    

}

module.exports = Account;