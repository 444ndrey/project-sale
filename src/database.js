const knex = require('knex').knex({
    client: 'better-sqlite3',
    connection: {
        filename: './database.sqlite',
    },
    useNullAsDefault: true
});

//      DATABASE fetch methods
exports.getAgents = () => {
    return knex.select().from('Agent');
}
exports.getAgentbyId = id => {
    return knex.select().from('Agent').where('id', id).first();
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
    return knex('Agent').where('id', id).del().then((res) => res);
}
exports.edtAgent = agent => {
    knex('Agent').where('id', agent.id).update({
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
    return knex.select().from('Entity').where('product', id);
};
exports.getProductbyId = id => {
    return knex.select().from('Product').where('id', id).first();
};
exports.saveChanges = product => {
    knex('Product').where('id', product.id).update({
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
    return knex('Product').where('id', id).del().then((res) => res);
}
exports.addNewPurchase = purchase => {
    return knex.insert({
        date: purchase.date,
        agent: purchase.agent,
        comment: purchase.comment
    }).returning('id').into('Purchase').then(el => {
        let id = el[0].id;
        let products = purchase.products.map(item => {
            return {
                purchase: id,
                product: item.id,
                amount: item.amount,
                cost: item.price
            };
        });
        knex('PurchaseProduct').insert(products).then(res => {
            return res;
        });
        products.forEach((item) => {
            knex('Entity').where('product', item.product).andWhere('cost', item.cost).then(res => {
                if (res.length > 0) {
                    knex('Entity').where('product', item.product).andWhere('cost', item.cost).first().update({
                        amount: res[0].amount + item.amount
                    }).then(res => res)
                }
                else {
                    knex('Entity').insert({
                        product: item.product,
                        cost: item.cost,
                        amount: item.amount
                    }).then(res => res);
                }
            })
        });
    })
}
exports.addNewSale = sale => {
    return knex.insert({
        date: sale.date,
        contract: sale.contract,
        payday: sale.payday,
        agent: sale.agent,
        comment: sale.comment
    }).returning('id').into('Sale').then(el => {
        let id = el[0].id;
        let products = sale.products.map(item => {
            return {
                sale: id,
                amount: item.amount,
                discount: null,
                product: item.id
            }
        });
        knex('SaleEntity').insert(products).then(res => res);
        products.forEach(item => {
            knex('Entity').where('id', item.product).then(result => {
                knex('Entity').where('id', item.product).first().update({
                    amount: result[0].amount - item.amount
                }).then(res => res);
            });
        });
    })
}
exports.getAllSales = () => {
    return knex.select().from('Sale');
}
exports.getAllPurchases = () => {
    return knex.select().from('Purchase');
}
exports.getPassword = () => {
    return knex.select().from('Password').then(res => {
        if (res.length == 0) {
            return {password: ''};

        }
        else {
            return res[0];
        }
    }).then(res => res.password);
}
exports.savePassword = (pass) => {
    knex.select().from('Password').then(res => {
        if (res.length == 0 && (pass != null && pass != '')) {
            knex('Password').insert({
                password: pass
            }).then(res => res);
        }
        else {
            if (pass == null || pass == '') {
                knex.select().from('Password').first().del().then(res => res);
            }
            else {
                knex.select().from('Password').first().update({
                    password: pass
                }).then(res => res);
            }
        }
    }).then(res => res);
}




