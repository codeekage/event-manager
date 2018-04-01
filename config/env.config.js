//create env varibales 
module.exports = {
    env : {
        port: process.env.PORT || 5000,
        db: process.env.MONGODB_URI || "mongodb://localhost/event_manager"
    }
 
}