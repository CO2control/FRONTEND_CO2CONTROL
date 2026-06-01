const { response } = require("express");
var geralModel = require("../models/geralModel");


function buscarSensores(req, res) {

    var idEmpresa = req.params.idEmpresa;

    geralModel.buscarSensores(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarAlertas(req, res) {

    var idEmpresa = req.params.idEmpresa;

    geralModel.buscarAlertas(idEmpresa).then(function (resultado) {
        if (resultado.length >= 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarVariacao(req, res) {

    var idEmpresa = req.params.idEmpresa;

    geralModel.buscarVariacao(idEmpresa).then(function (resultado) {
        if (resultado.length >= 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarAlertas2(req, res) {

    var idEmpresa = req.params.idEmpresa;

    geralModel.buscarAlertas2(idEmpresa).then(function (resultado) {
        if (resultado.length >= 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarTanqueAlerta(req, res) {

    var idEmpresa = req.params.idEmpresa;

    geralModel.buscarTanqueAlerta(idEmpresa).then(function (resultado) {
        if (resultado.length >= 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarCards(req, res) {

    var idEmpresa = req.params.idEmpresa;

    geralModel.buscarCards(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function addTanque() {
        var idEmpresa = req.params.idEmpresa;

    geralModel.buscarCards(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function addTanque(req, res) {

    var idEmpresa = req.params.idEmpresa;

    var nome = req.body.nomeServer;
    var local = req.body.localServer;
    var tipo = req.body.tipoServer;
    var capacidade = req.body.capacidadeServer;
    var status = req.body.statusServer;

    geralModel.addTanque(
        nome,
        local,
        tipo,
        capacidade,
        status,
        idEmpresa
    ).then(function (resultado) {

        res.status(200).json(resultado);

    }).catch(function (erro) {

        console.log(erro);
        console.log("Erro ao cadastrar tanque:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    });
}

module.exports = {
    buscarSensores,
    buscarAlertas,
    buscarCards,
    buscarAlertas2,
    buscarTanqueAlerta,
    buscarVariacao,
    addTanque
}