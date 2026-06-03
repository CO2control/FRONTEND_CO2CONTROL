var database = require("../database/config")

function buscarAlertasPorIdEmpresa(id_empresa, filter_param) {
    let instrucaoSql = `
        SELECT 
            a.id, ar.nome_identificador, ar.local_tanque, a.nivel, DATE(a.data_alerta) as data_alerta, TIME(a.data_alerta) as hora_alerta, ls.nivel_carbono, e.razao_social
        FROM
            alerta a
                JOIN
            sensor s ON a.fk_sensor = s.id
                JOIN
            armazenamento ar ON ar.id = s.fk_armazenamento
                JOIN
            empresa e ON ar.fk_empresa = e.id
                JOIN
            leitura_sensor ls ON a.fk_leitura = ls.id
        WHERE
            ar.fk_empresa = ${id_empresa}
    `;
    if (filter_param == 0) {
        instrucaoSql += ";";
    } else if (filter_param == 1) {
        instrucaoSql += " ORDER BY ls.nivel_carbono DESC;";
    } else if(filter_param == 2) {
        instrucaoSql += " ORDER BY ar.local_tanque ASC;";
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarAlertasPorIdEmpresa
};