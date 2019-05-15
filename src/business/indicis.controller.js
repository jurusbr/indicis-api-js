const IndicisDAO = require('./indicis.dao');
const futuroConverter = require("../util/futuroConverter");

class IndicisController{ 


	getDiCurve(req, res){

        let dao = new IndicisDAO();
        dao.getDiCurve().then( (curve) => {
            res.json({curve:curve});
        }).catch( (err) => {
            res.status(500).send(err);
        } );

    }    

    getFutureCurve(indice, req, res){

        let collectionName = this.getCollectionName(indice);

        let dao = new IndicisDAO();                                          

        if(req.query.days || req.query.interpolate){
            dao.getInterpolateFutureDiCurve(collectionName,req.query.days).then( (curve) => {

                if(req.query.days){
                    curve.curveInterp = curve.curveInterp.filter( (i) => i.day < req.query.days );
                }
                
                res.json(curve.curveInterp);
                
            }).catch( (err) => {
                console.log(err);
                res.status(500).send(err);
            } );
        }else{
            console.log("Buscando curva do di futuro");
            dao.getFutureDiCurve(collectionName).then( (curve) => {
                //Mudar first para last curve
                console.log(curve[0].curve);
                
                let aux = [];

                for (var key in curve[0].curve) {
                    if (curve[0].curve.hasOwnProperty(key)) {
                        aux.push({code:key, date:futuroConverter.fromCodeToDate(key), value:parseFloat(curve[0].curve[key])})
                    }
                  }

                  aux = aux.sort( (a,b) => parseInt(a.date) - parseInt(b.date));
                
                curve[0].curve=aux;

                res.json(aux);
            }).catch( (err) => {
                console.log("Erro na busca");
                console.log(err);
                res.status(500).send(err);
            } );
        }        

    }

    getCollectionName(indice) {
        let collectionName = "";
        switch (indice) {
            case "di": {
                collectionName = "DIFUTURO";
                break;
            }
            case "dap": {
                collectionName = "DAP";
                break;
            }
        }
        //TODO: tratar indice nao encontrado

        return collectionName;
    }
}
module.exports = IndicisController;