const { response } = require("express");
var alertaModel = require("../models/alertaModel");

function buscarAlertasPorIdEmpresa(req, res){
    let id_empresa = req.params.id_empresa
    let filter_param = req.params.filter_param

    alertaModel.buscarAlertasPorIdEmpresa(id_empresa, filter_param).then(response=>{
        if(response.length > 0){
             res.status(200).json(response)
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(error=>{
        console.log(error);
        res.status(500).json(error.sqlMessage);
    })
}


module.exports = {
    buscarAlertasPorIdEmpresa
}