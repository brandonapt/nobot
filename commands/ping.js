const roblox = require('noblox.js');
const path = require('path');
const _ = require('lodash');
require('dotenv').config();
const db = require('quick.db')
const commandList = db.get('commandList')
const { reply } =  require('../index');
const { REPL_MODE_STRICT } = require('repl');
const prefix = '/'


const config = {
    description: 'Replies with Pong!',
    aliases: [],
    usage: '',
    rolesRequired: [],
    category: 'Test'
}

module.exports = {
    config,
    run: async (id, message, args) => {
        reply('Pong!',id)
    }
}