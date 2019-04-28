var express = require('express');
var router = express.Router();

const Controller = require("../business/indicis.controller");
const controller = new Controller();

//monitor
router.get('/', (req, res, next) => {
    res.send("Servico running no banco " );
});

router.get('/v1/di', (req, res) => {controller.getDiCurve(req,res)});

//Utilizar ENUM no lugar de "di"
router.get('/v1/futuro/di', (req, res) => {controller.getFutureCurve("di",req,res)});
router.get('/v1/futuro/dap', (req, res) => {controller.getFutureCurve("dap",req,res)});

module.exports = router;

