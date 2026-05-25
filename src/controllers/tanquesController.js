const { response } = require("express");
var tanquesModel = require("../models/tanquesModel");


function buscarGrafico1(req, res){

    var idEmpresa = req.params.idEmpresa;
    var idArmazenamento = req.params.idArmazenamento;

    tanquesModel.buscarGrafico1(idEmpresa, idArmazenamento)
    .then(function(resultado){
        res.json(resultado);
    });
}


function buscarGrafico2(req, res){

    var idEmpresa = req.params.idEmpresa;
    var idArmazenamento = req.params.idArmazenamento;

    tanquesModel.buscarGrafico2(idEmpresa, idArmazenamento)
    .then(function(resultado){
        res.json(resultado);
    });
}

function buscarKPIs(req, res){

    var idEmpresa = req.params.idEmpresa;
    var idArmazenamento = req.params.idArmazenamento;

    tanquesModel.buscarKPIs(idEmpresa, idArmazenamento)
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro);
    });

}


function buscarTendencia(req, res){

    var idEmpresa = req.params.idEmpresa;
    var idArmazenamento = req.params.idArmazenamento;

    tanquesModel.buscarTendencia(idEmpresa, idArmazenamento)
    .then(function(resultado){
        res.json(resultado);
    });

}


function atualizarTanque(req, res){

    var nome = req.body.nomeServer;
    var localizacao = req.body.localServer;
    var utilizacao = req.body.utilizacaoServer;
    var idArmazenamento = req.body.idArmazenamentoServer;

    tanquesModel.atualizarTanque(nome,localizacao,utilizacao,idArmazenamento)
    .then(function(resultado){
        res.json(resultado);
    });

}

function excluirTanque(req, res){

    var idArmazenamento = req.params.idArmazenamento;

    tanquesModel.excluirTanque(idArmazenamento)
    .then(function(resultado){
        res.json(resultado);
    });
}


module.exports = {
    buscarGrafico1,
    buscarGrafico2,
    buscarKPIs,
    buscarTendencia,
    atualizarTanque,
    excluirTanque
}