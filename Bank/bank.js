const Ledger = require("../BankLedger/ledger")

class Bank{
    static bankId = 0;
    static AllBanks = [];
    constructor(bankId , bankName ,abbreviation ,  accounts , isActive , ledger){
        this.bankId =bankId;
        this.bankName = bankName;
        this.abbreviation = abbreviation;
        this.accounts = accounts;
        this.isActive = isActive;
        this.ledger = ledger;
    }

    static createBank(bankName , abbreviation){
       try {
        if(typeof bankName != "string"){
            throw new Error("BANK NAME IS INVALID")
        }

        if(typeof abbreviation != "string"){
            throw new Error("abbrevation is invalid")
        }

        let newBank = new Bank(++Bank.bankId , bankName , abbreviation , [] , true , []);
        Bank.AllBanks.push(newBank);
        return newBank;
        
       } catch (error) {
         throw error;
       }
    }

    getBankName(){
       try {
        if(!this.isActive){
            throw new Error("bank is inactive");
        }
        return this.abbreviation;
       } catch (error) {
         throw error;
       }
    }

    static getBankByBankName(abbreviation){
        try {
            for(let i=0; i<Bank.AllBanks.length; i++){
                if(Bank.AllBanks[i].abbreviation == abbreviation && Bank.AllBanks[i].isActive){
                    return Bank.AllBanks[i];
                }
            }
        } catch (error) {
            throw error;
        }
    }

    static getBankById(id){
        try {
            
            for(let i=0; i<Bank.AllBanks.length; i++){
                if(Bank.AllBanks[i].bankId == id && Bank.AllBanks[i].isActive){
                    return Bank.AllBanks[i];
                }
            }
        } catch (error) {
            throw error;
        }
    }

    static updateBankById(id , parameter , value){
        try {
            if(typeof id != "number"){
                throw new Error("id is invalid");
            }
            if(typeof parameter != "string"){
                throw new Error("parameter is invalid")
            }
            let reqBank = Bank.getBankById(id);
            switch(parameter){
                case "bankName":
                    reqBank.updateBankName(value);
                    break;
                case "abbreviation":
                    reqBank.updateAbbreviation(value);
                    break;
                default:
                    throw new Error("parameter is invalid")
            }
        } catch (error) {
            throw error;
        }
    }

    updateBankName(value){
        try {
            if(typeof value != "string"){
                throw new Error("value is invalid")
            }

            this.bankName = value;
            
        } catch (error) {
           throw error; 
        }
    }

    updateAbbreviation(value){
        try {
            if(typeof this.abbreviation != "string"){
                throw new Error("value is invalid")
            }
            this.abbreviation = value;
        } catch (error) {
            throw error;
        }
    }

    isActiveAccounts(){
        try {
            
            for(let i=0; i<this.accounts.length; i++){
                if(this.accounts[i].isActive == true){
                    return true;
                }
            }
            return false;
        } catch (error) {
           throw error; 
        }
    }

    static deleteBank(bankID){
        try {
            let reqBank = Bank.getBankById(bankID);
            
            if(reqBank.isActiveAccounts()){
               throw new Error("bank contains active accounts , so can't delete it..") 
            }
            reqBank.isActive = false;
            console.log(reqBank);
        } catch (error) {
           throw error; 
        }
    }

    updateLedger(bankID , bankName , otherBankAbbreviation, amount){
        try {
            let found = false;
           
            for (let i = 0; i < this.ledger.length; i++) {
                if (this.ledger[i].bankID === bankID) {
                    this.ledger[i].netAmount += amount;
                    found = true;
                    break;
                }
            }

    
            if (!found) {
                let newEntry = Ledger.newLedgerEntry(bankID, bankName, otherBankAbbreviation);
                newEntry.netAmount = amount;
                this.ledger.push(newEntry);
            }

        } catch (error) {
            throw error;
        }
    }

    getLedger(){
        return this.ledger;
    }

}

module.exports = Bank;