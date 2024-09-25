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
            let account = new Account(accountID , ++Account.accountNumber , 1000);
            return account;
        } catch (error) {
            
        }
    }

}

module.exports = Account;