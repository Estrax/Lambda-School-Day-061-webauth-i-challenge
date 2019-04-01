const knex = require('knex');
const dbConfig = require('../../../knexfile');
const db = knex(dbConfig.development);

module.exports = {
    getUsers,
    addUser,
    getUserById,
    getUserByUsername,
    updateUser,
    removeUser
};

async function getUsers(){
    return await db
            .select('id', 'username')
            .from('users');
}

async function addUser(user){
    return await db('users')
            .insert(user);
}

async function getUserById(id){
    return await db
            .select('id', 'username')
            .from('users')
            .where({ id })
            .first();
}

async function getUserByUsername(username){
    return await db
            .select('*')
            .from('users')
            .where({ username })
            .first();
}

async function updateUser(id, user){
    return await db('users')
        .where({ id })
        .update(user);
}

async function removeUser(id){
    return await db('users')
            .where({ id })
            .del();
}
