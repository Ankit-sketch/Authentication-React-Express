class customErrorHandler extends Error {
    constructor(status, msg){
        super();
        this.status = status;
        this.message = msg;
    }
    static alreadyExists(message){
        return new customErrorHandler(409, message);
    }
    static wrongCredentials(message){
        return new customErrorHandler(409, message);
    }
    static unauthorised(message){
        return new customErrorHandler(409, message);
    }
    static notfound(message){
        return new customErrorHandler(409, message);
    }
    static notsent(message){
        return new customErrorHandler(409, message);
    }
    static invalidtoken(message){
        return new customErrorHandler(409, message);
    }
}
export default customErrorHandler;