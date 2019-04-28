const mongodb = require('mongodb');
const logger = require("../util/logger");

 
class Db{
 
	constructor(){
		this.mongoClient = mongodb.MongoClient;
        this.ObjectID = mongodb.ObjectID;

        this.mongoURL = process.env.MONGO;

        logger.config(`URL do mongodb ${this.mongoURL}`)
	}
 
	onConnect(callback){
		this.mongoClient.connect(this.mongoURL, (err, client) => {
			if(err) {
				console.log(err);
            }else{
				console.log("MongoDB connectado com sucesso");
			}
			callback(client.db("jurus"),client,this.ObjectID);
		});
	}
}
module.exports = new Db();