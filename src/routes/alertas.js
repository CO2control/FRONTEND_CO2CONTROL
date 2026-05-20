var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/buscarAlertasPorIdEmpresa/:id_empresa/:filter_param", function(req, res){
    alertaController.buscarAlertasPorIdEmpresa(req, res)
})


module.exports = router;