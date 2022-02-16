const roblox = require('noblox.js');
const path = require('path');
const _ = require('lodash');
require('dotenv').config();
const db = require('quick.db')
const commandList = db.get('commandList')
const { reply } =  require('../index')
const prefix = '/'


const config = {
    description: 'Sets the group ID.',
    aliases: [],
    usage: '<group id>',
    rolesRequired: [],
    category: 'Settings'
}

module.exports = {
    config,
    run: async (id, message, args) => {
        //use getchatmessages on await messages for this command
        //still tho, group ids get tagged...
    }
}