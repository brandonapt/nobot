const roblox = require('noblox.js');
const path = require('path');
const _ = require('lodash');
require('dotenv').config();
const db = require('quick.db')
const commandList = db.get('commandList')
const { reply } =  require('../index');
const { stdout } = require('process');
const prefix = '/'


const config = {
    description: 'Shows a list of commands.',
    aliases: [],
    usage: '[command name]',
    rolesRequired: [],
    category: 'Info'
}

module.exports = {
    config,
    run: async (id, message, args) => {
        let commandQuery = args[0];
        if(commandQuery) {
            let command = commandList.find(c => c.name.toLowerCase() === commandQuery.toLowerCase() || c.config.aliases.map(a => a.toLowerCase()).includes(commandQuery.toLowerCase()));
            if(command) {
                reply(`${command.name} - Command Info`,id);
                reply(command.config.description,id);
                if(command.config.aliases.length !== 0) reply('Aliases', command.config.aliases.join(', '), id);
                reply('Usage', `\`${prefix}${command.name}${command.config.usage ? ` ${command.config.usage}` : ''}\``, id);
                reply('Category', command.config.category, id);
                return;
            }
        }
        await reply('Here is a list of bot commands:',id)
        let categories = _.groupBy(commandList, c => c.config.category);
        for (const categoryName of Object.keys(categories)) {
            let category = categories[categoryName];
            let commandString = category.map(c => `${prefix}${c.name}${c.config.usage ? ` ${c.config.usage}` : ''} - ${c.config.description}`).join(' | ');
            reply(`${commandString}`,id);
        }

return
    }
}