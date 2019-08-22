const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table
            .increments();

        table
            .string('username', 128)
            .notNullable()
            .unique();
        
        table
            .string('password', 128)
            .notNullable();
    });
};

exports.down = dropTable('users');