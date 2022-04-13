const knex = require('knex').knex({
    client: 'better-sqlite3',
    connection: {
        filename: './database.sqlite'
    },
    useNullAsDefault: true
})

exports.getAgents = () => {
    return knex.select().from('Agent');
}





