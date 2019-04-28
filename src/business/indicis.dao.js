'use strict';
const logger = require("../util/logger");

class IndicisDAO{

   constructor(){
       this.Mongodb = require("../db/db");
   }

   getDiCurve(){  

        return new Promise((resolve, reject) => {

            this.Mongodb.onConnect( (db) => {
                db.collection("CDI").find({},{"sort": "dtReferencia"}).toArray(function(err, documents) {
                    if (err) reject(err);
                    logger.info("Retornando curva DI");
                    resolve(documents);
                });
        });

        });       
    }

    getFutureDiCurve(collectionName){  

        const project = {curve:1,dtReferencia:1};

        return new Promise((resolve, reject) => {

            this.Mongodb.onConnect( (db) => {
                db.collection(collectionName).find({}).project(project).sort({dtReferencia: -1}).limit(1).toArray(function(err, documents) {
                    if (err) reject(err);
                    logger.info("Retornando curva Futuro DI");
                    resolve(documents);
                });
        });

        });       
    }

    getInterpolateFutureDiCurve(collectionName, days){  

        const project = {curveInterp:1,dtReferencia:1};

        return new Promise((resolve, reject) => {

            this.Mongodb.onConnect( (db) => {
                db.collection(collectionName).find({}).project(project).sort({dtReferencia: -1}).limit(1).toArray(function(err, documents) {
                    if (err) reject(err);
                    logger.info("Retornando curva Futuro DI");
                    resolve(documents[0]);
                });
        });

        });       
    }


}

module.exports = IndicisDAO;