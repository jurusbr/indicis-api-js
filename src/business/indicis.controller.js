const IndicisDAO = require('./indicis.dao');

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
                    let filtered = curve.curveInterp.filter( (i) => i.day < req.query.days );
                    res.json(filtered);
                }else{
                    res.json(curve.curveInterp);
                }                
                
            }).catch( (err) => {
                console.log(err);
                res.status(500).send(err);
            } );
        }else{
            dao.getFutureDiCurve(collectionName).then( (curve) => {
                res.json(curve);
            }).catch( (err) => {
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