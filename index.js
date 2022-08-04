const { Client, Intents } = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
})

client.on('ready', () => {
    status(client)
    client.user.setPresence({ 
        activities: [{ 
            name: 'Servername', 
            type: 1, 
            url: 'YOUR-SERVER-URL'
        }], 
        status: 'dnd'
    });
})

const status = require('./status');

client.login(config.token);