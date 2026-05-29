var database = require("../database/config");

function buscarSensores(idEmpresa) {

    var instrucaoSql = `select
    e.id as id_empresa,
    e.razao_social,
    count(s.id) as total_sensores,
    sum(s.situacao = 1) as sensores_ativos
    from empresa e
    join armazenamento a on a.fk_empresa = e.id 
    left join sensor s on s.fk_armazenamento = a.id
    where e.id = ${idEmpresa}
    group by e.id, e.razao_social;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertas(idEmpresa) {

    var instrucaoSql = `select
            count(al.id) as alertas_hoje
        from alerta al
        join sensor s
            on al.fk_sensor = s.id
        join armazenamento a 
            on s.fk_armazenamento = a.id
        join empresa e 
            on a.fk_empresa = e.id
        where e.id = ${idEmpresa}
        and date(al.data_alerta) = curdate();`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarCards(idEmpresa) {

    var instrucaoSql = `SELECT 
    a.nome_identificador AS tanque,
    l.nivel_carbono AS nivel,
    a.local_tanque AS localizacao,
    date_format(MAX(al.data_alerta), '%d/%m/%Y %H:%i') AS ultimo_alerta
    FROM armazenamento a
    JOIN sensor s 
        ON s.fk_armazenamento = a.id
    LEFT JOIN leitura_sensor l 
        ON l.fk_sensor = s.id
    LEFT JOIN alerta al 
        ON al.fk_sensor = s.id
    WHERE a.fk_empresa = ${idEmpresa}
    GROUP BY 
        a.id,
        a.nome_identificador,
        l.nivel_carbono,
        a.local_tanque;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {  
    buscarSensores,
    buscarAlertas,
    buscarCards
}