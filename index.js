const noblox = require("noblox.js")
const fs = require('fs');
const chalk = require('chalk')
let commandList = [];
const db = require('quick.db')
const prefix = '/'
require('dotenv').config()

fs.readdir('./commands/', async (err, files) => {
    if(err){
        return console.log(chalk.red('An error occured when checking the commands folder for commands to load: ' + err));
    }
    files.forEach(async (file) => {
        if(!file.endsWith('.js')) return;
        let commandFile = require(`./commands/${file}`);
        commandList.push({
            file: commandFile,
            name: file.split('.')[0],
            config: commandFile.config
        });
    });
    db.set('commandList',commandList)
});


const cookie = process.env.cookie;
async function nobloxCrap () {

    const currentUser = await noblox.setCookie(cookie) 
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)
    let raw
    noblox.onNewMessage().on("data", async function(data) {
        let id = data
        raw = await noblox.getChatMessages(data, 1)
        const message = raw[0]
        if(!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).split(' ');
        const commandName = args[0].toLowerCase();
        args.shift();
        const command = commandList.find((cmd) => cmd.name === commandName || cmd.config.aliases.includes(commandName));
        if(!command) return;

        command.file.run(id, message, args);
       })

}

nobloxCrap()

module.exports = {
    reply: async (text, id) => {
        await noblox.sendChatMessage(id,text)
 
    }
 }

