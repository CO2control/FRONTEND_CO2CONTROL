var database = require("../database/config")

function atualizarTanque(nome, localizacao, utilizacao, idArmazenamento) {
    var instrucaoSql = `
        UPDATE armazenamento
        SET nome_identificador = '${nome}',
            local_tanque = '${localizacao}',
            utilizacao = ${utilizacao}
        WHERE id = ${idArmazenamento};
    `;

    console.log("UPDATE:", instrucaoSql);
    return database.executar(instrucaoSql)

}


function buscarGrafico1(idEmpresa, idArmazenamento) {
    var instrucaoSql = `
    
        SELECT *
        FROM (
            SELECT 
                nivel_carbono,
                data_registro
            FROM vw_dashboard
            WHERE fk_empresa = ${idEmpresa}
                AND fk_armazenamento = ${idArmazenamento}
            ORDER BY data_registro DESC
            LIMIT 10
        ) ultimas
        ORDER BY data_registro ASC;
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarGrafico2(idEmpresa, idArmazenamento) {
    var instrucaoSql = `
        SELECT 
            nivel_carbono,
            data_registro
        FROM vw_dashboard
        WHERE fk_empresa = ${idEmpresa}
            AND fk_armazenamento = ${idArmazenamento}
        ORDER BY data_registro DESC
        LIMIT 1;
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarKPIs(idEmpresa, idArmazenamento) {
    var instrucaoSql = `
        SELECT 
            a.id AS idArmazenamento,
            a.nome_identificador AS nome,
            (
                SELECT MAX(nivel_carbono) FROM vw_dashboard
                WHERE fk_armazenamento = a.id
            ) AS maximo,
            (
                SELECT data_registro FROM vw_dashboard
                WHERE fk_armazenamento = a.id
                ORDER BY nivel_carbono DESC, data_registro DESC
                LIMIT 1
            ) AS data_maximo,
            (
                SELECT COUNT(*) FROM vw_dashboard
                WHERE fk_armazenamento = a.id
                AND (
                    nivel_carbono < 20
                    OR nivel_carbono > 40
                )
            ) AS alertas,
            (
                SELECT data_registro FROM vw_dashboard
                WHERE fk_armazenamento = a.id
                AND (nivel_carbono < 20 OR nivel_carbono > 40)
                ORDER BY data_registro DESC
                LIMIT 1
            ) AS ultimo_alerta

        FROM armazenamento a
        WHERE a.fk_empresa = ${idEmpresa}
        AND a.id = ${idArmazenamento};
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarTendencia(idEmpresa, idArmazenamento) {
    var instrucaoSql = `
        SELECT 
            nivel_carbono,
            data_registro
        FROM vw_dashboard
        WHERE fk_empresa = ${idEmpresa}
            AND fk_armazenamento = ${idArmazenamento}
        ORDER BY data_registro DESC
        LIMIT 2;
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function excluirTanque(idArmazenamento) {
    let sqlAlerta = `
        DELETE FROM alerta
        WHERE fk_leitura IN 
        (
            SELECT id FROM vw_dashboard
            WHERE fk_armazenamento = ${idArmazenamento}
        );
    `;

    let sqlLeitura = `
        DELETE FROM leitura_sensor
        WHERE fk_sensor IN 
        (
            SELECT id FROM sensor
            WHERE fk_armazenamento = ${idArmazenamento}
        );
    `;

    let sqlSensor = `
        DELETE FROM sensor
        WHERE fk_armazenamento = ${idArmazenamento};
    `;

    let sqlArmazenamento = `
        DELETE FROM armazenamento
        WHERE id = ${idArmazenamento};
    `;

    return database.executar(sqlAlerta)
        .then(() => database.executar(sqlLeitura))
        .then(() => database.executar(sqlSensor))
        .then(() => database.executar(sqlArmazenamento));
}


module.exports = {
    atualizarTanque,
    buscarGrafico1,
    buscarGrafico2,
    buscarKPIs,
    buscarTendencia,
    excluirTanque
};