class Passbook{
    constructor(date, type , amount , balance){
        this.date = date;
        this.type = type;
        this.amount = amount;
        this.balance = balance;
    }

    static addDetailsToPassBook(type , amount , balance){
        try {
           if(typeof type != "string"){
            throw new Error("type is invaid");
           }
           if(typeof amount != "number"){
            throw new Error("amount is invalid");
           } 
           if(typeof balance != "number"){
            throw new Error("number is invalid");
           }
           let date = new Date();
           let newEntry = new Passbook(date , type , amount , balance);
           return newEntry;
        } catch (error) {
           throw error; 
        }
    }
}

module.exports = Passbook;