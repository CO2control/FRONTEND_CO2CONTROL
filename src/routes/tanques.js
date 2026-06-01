var express = require("express");
var router = express.Router();

var tanquesController = require("../controllers/tanquesController");


router.get("/buscarGrafico1/:idEmpresa/:idArmazenamento", function(req, res){
    tanquesController.buscarGrafico1(req, res);
});

router.get("/buscarGrafico2/:idEmpresa/:idArmazenamento", function(req, res){
    tanquesController.buscarGrafico2(req, res);
});

router.get("/buscarKPIs/:idEmpresa/:idArmazenamento", function(req, res){
    tanquesController.buscarKPIs(req, res);
});

router.get("/buscarTendencia/:idEmpresa/:idArmazenamento", function(req, res){
    tanquesController.buscarTendencia(req, res);
});

router.put("/atualizarTanque/:idEmpresa", function(req, res){
    tanquesController.atualizarTanque(req, res);
});

router.delete("/excluirTanque/:idArmazenamento", function(req, res){
    tanquesController.excluirTanque(req, res);
});


module.exports = router;