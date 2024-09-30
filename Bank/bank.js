class Bank{
    static bank_id = 0;
    static AllBanks = [];
    constructor(bank_id , bankName ,abbreviation ,  accounts , isActive , ledger){
        this.bank_id = bank_id;
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

        let newBank = new Bank(++Bank.bank_id , bankName , abbreviation , [] , true , []);
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
                if(Bank.AllBanks[i].bank_id == id && Bank.AllBanks[i].isActive){
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

    updateLedger(otherBankAbbreviation, amount){
       try {
        if (!this.ledger[otherBankAbbreviation]) {
            this.ledger[otherBankAbbreviation] = 0; 
        }
        this.ledger[otherBankAbbreviation] += amount;
       } catch (error) {
        throw error;
       }
    }

}

module.exports = Bank;