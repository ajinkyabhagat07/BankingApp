class Bank{
    static bank_id = 0;
    static AllBanks = [];
    constructor(bank_id , bankName ,abbreviation ,  accounts){
        this.bank_id = bank_id;
        this.bankName = bankName;
        this.abbreviation = abbreviation;
        this.accounts = accounts;
    }

    static createBank(bankName , abbreviation){
       try {
        if(typeof bankName != "string"){
            throw new Error("BANK NAME IS INVALID")
        }

        if(typeof abbreviation != "string"){
            throw new Error("abbrevation is invalid")
        }

        let newBank = new Bank(++Bank.bank_id , bankName , abbreviation , []);
        Bank.AllBanks.push(newBank);
        return newBank;
        
       } catch (error) {
         throw error;
       }
    }

    getBankName(){
        return this.abbreviation;
    }

    static getBankById(id){
        try {
            
            for(let i=0; i<Bank.AllBanks.length; i++){
                if(Bank.AllBanks[i].bank_id == id){
                    return Bank.AllBanks[i];
                }
            }
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Bank;