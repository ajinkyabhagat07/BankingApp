class Ledger{
    constructor(bankID , bankName , abbreviation , netAmount){
        this.bankID = bankID;
        this.bankName = bankName;
        this.abbreviation = abbreviation;
        this.netAmount = netAmount;
    }

    static newLedgerEntry(bankID , bankName ,abbreviation){
       try {
        console.log(bankID);
        if(typeof bankID != "number"){
            throw new Error("bank id is invalid");
        }

        if(typeof bankName != "string"){
            throw new Error("bank name is invalid");
        }

        if(typeof abbreviation != "string"){
            throw new Error("abbreviation is invalid");
        }

        let newEntry = new Ledger(bankID , bankName , abbreviation , 0);

        return newEntry;
       } catch (error) {
         throw error;
       }
    }
}

module.exports = Ledger;
