class Account{
    static accountNumber = 1000;
    constructor(accountID , accountNumber , amount){
        this.accountID = accountID;
        this.accountNumber = accountNumber;
        this.amount = amount;
    }

    static newAccount(accountID){
        try {
            if(typeof accountID != "number"){
                throw new Error("accountid is invalid");
            }
            return new Account(accountID, ++Account.accountNumber, 1000);
        
        } catch (error) {
            throw error;
        }
    }

    static validateAccountNumber(accountNumber){
        try {
            if(typeof accountNumber != "number"){
                throw new Error("account numbetr is invalid")
            }
        } catch (error) {
            throw error;
        }
    }

    getAccountNumber(){
        return this.accountNumber;
    }

    depositeMoney(amount){
       try {
        if(typeof amount != "number"){
            throw new Error("amount is invalid");
        }
        this.amount += amount;
       } catch (error) {
         throw error;
       }
    }

    getTotalBalance(){
        return this.amount;
    }

    getAmount(){
        return this.amount;
    }

    withdrawMoney(amount){
        try {
            if(this.amount < amount){
                throw new Error("Insufficient funds")
            }
            this.amount -= amount;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Account;