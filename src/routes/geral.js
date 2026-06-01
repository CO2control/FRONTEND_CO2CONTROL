    var express = require("express");
    var router = express.Router();

    var geralController = require("../controllers/geralController");

    router.get("/sensores/:idEmpresa", function (req, res) {
        geralController.buscarSensores(req, res);
    });

    router.get("/alertas/:idEmpresa", function (req, res) {
        geralController.buscarAlertas(req, res);
    });

    router.get("/alertas2/:idEmpresa", function (req, res) {
        geralController.buscarAlertas2(req, res);
    });

    router.get("/tanqueAlertas/:idEmpresa", function (req, res) {
        geralController.buscarTanqueAlerta(req, res);
    });

    router.get("/alertas4/:idEmpresa", function (req, res) {
        geralController.buscarVariacao(req, res);
    });

    router.get("/cards/:idEmpresa", function (req, res) {
        geralController.buscarCards(req, res);
    });

    router.post("/addTanque/:idEmpresa", function (req, res) {
    geralController.addTanque(req, res);
});

    module.exports = router;
