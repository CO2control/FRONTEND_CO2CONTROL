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

function buscarAlertas2(idEmpresa) {

    var instrucaoSql = `select 
    a.nome_identificador as tanque,
    al.mensagem,
    date_format(al.data_alerta, '%d/%m/%Y %H:%i') as data_alerta,
    al.nivel
    from alerta al
    inner join sensor s 
        on al.fk_sensor = s.id
    inner join armazenamento a 
        on s.fk_armazenamento = a.id
    join empresa e
        on e.id = a.fk_empresa
    where e.id = ${idEmpresa}
    and date(al.data_alerta) = curdate()
    order by al.data_alerta desc;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTanqueAlerta(idEmpresa) {

    var instrucaoSql = `select count(distinct a.id) as tanques_com_alerta
    from alerta al
    join sensor s
    on al.fk_sensor = s.id
    join armazenamento a
    on s.fk_armazenamento = a.id
    where a.fk_empresa = ${idEmpresa}
    and date(al.data_alerta) = curdate();`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarVariacao(idEmpresa) {

    var instrucaoSql = `select s.id, a.nome_identificador, max(nivel_carbono), 
        min(nivel_carbono), 
        (max(nivel_carbono) - min(nivel_carbono)) as diferenca 
        from leitura_sensor ls join sensor s 
        on ls.fk_sensor = s.id join armazenamento a
        on s.fk_armazenamento = a.id join empresa e
        on a.fk_empresa = ${idEmpresa}
        group by s.id
        order by diferenca desc
        limit 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarCards(idEmpresa) {

    var instrucaoSql = `select a.id, a.nome_identificador as tanque, a.local_tanque as localizacao, 
ifnull((select l.nivel_carbono from leitura_sensor l 
join sensor s on l.fk_sensor = s.id 
where s.fk_armazenamento = a.id order by l.data_registro desc limit 1) , 'Aguarde' )
as nivel,
 ifnull((select max(data_registro) from leitura_sensor l2 
join sensor s2 on s2.id = l2.fk_sensor where s2.fk_armazenamento = a.id ), 'Sem alertas' )
as ultimo_alerta
from armazenamento a join empresa e on e.id = a.fk_empresa where e.id = ${idEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function addTanque(nome, local, tipo, capacidade, status, idEmpresa) {

    var instrucaoSql = `
        insert into armazenamento
        (nome_identificador, local_tanque, fk_empresa, tipo, capacidade, utilizacao)
        values
        ('${nome}', '${local}', ${idEmpresa}, '${tipo}', ${capacidade}, ${status});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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