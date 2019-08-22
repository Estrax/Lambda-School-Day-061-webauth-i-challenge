module.exports = {
    dropTable: (name) => knex => knex.schema.dropTableIfExists(name)
}