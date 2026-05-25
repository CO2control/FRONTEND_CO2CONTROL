    var express = require("express");
    var router = express.Router();

    var geralController = require("../controllers/geralController");

    router.get("/sensores/:idEmpresa", function (req, res) {
        geralController.buscarSensores(req, res);
    });

    router.get("/alertas/:idEmpresa", function (req, res) {
        geralController.buscarAlertas(req, res);
    });

    router.get("/cards/:idEmpresa", function (req, res) {
        geralController.buscarCards(req, res);
    });

    module.exports = router;
