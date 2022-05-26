const knex = require('knex').knex({
    client: 'better-sqlite3',
    connection: {
        filename: './database.sqlite'
    },
    useNullAsDefault: true
})

//      DATABASE fetch methods
exports.getAgents = () => {
    return knex.select().from('Agent');
}
exports.getAgentbyId = id => {
    return knex.select().from('Agent').where('id',id).first();
}
exports.addAgent = agent => {
        knex.insert({
        inn: agent.inn,
        kpp: agent.kpp,
        name: agent.name,
        address: agent.address,
        phone: agent.phone,
        email: agent.email
    }).into('Agent').then((res) => res);
}
exports.removeAgentbyId = id => {
    return knex('Agent').where('id',id).del().then((res) => res);
}
exports.edtAgent = agent => {
    knex('Agent').where('id',agent.id).update({
        inn: agent.inn,
        kpp: agent.kpp,
        name: agent.name,
        address: agent.address,
        phone: agent.phone,
        email: agent.email
    }).then((res) => res);
};
exports.getProducts = () => {
    let result = knex.select().from('Product')
    return result;
};
exports.getEntities = id => {
    return knex.select().from('Entity').where('product',id);
};
exports.getProductbyId = id => {
    return knex.select().from('Product').where('id',id).first();
};
exports.saveChanges = product => {
    knex('Product').where('id',product.id).update({
        code: product.code,
        price: product.price,
        unit: product.unit,
        name: product.name,
        nds: product.nds
    }).then(res => res);
}
exports.addProduct = product => {
    knex.insert({
        code: product.code,
        price: parseFloat(product.price),
        unit: product.unit,
        name: product.name,
        nds: product.nds
    }).into('Product').then(res => res);
}
exports.removeProductbyId = id => {
    return knex('Product').where('id',id).del().then((res) => res);
}




