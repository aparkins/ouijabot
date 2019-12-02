const discord = require('discord.js')
const auth = require('./auth.json');

const model = require('./model.js');
const db = require('./db.js');

// Initialize game state
const GAME_STATES = db.load_states(auth.db);

// Setup Discord connection
const client = new discord.Client();
client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    // ignore DMs
    if (!msg.guild) {
        return;
    }

    guildGame = GAME_STATES[msg.guild.id];
    if (!guildGame) {
        return;
    }

    guessRegex = /^!spirit (.*)$/;
    guessMatches = guessRegex.exec(msg.content);
    if (guessMatches) {
        guess = guessMatches[1];
        if (guildGame.checkWhodunnit(guess)) {
            _ghostPositiveResponse(msg);
            // TODO: setup next ghost
        } else {
            _ghostNegativeResponse(msg);
        }
    }

    if (guildGame.containsKeyword(msg.content)) {
        _ghostTriggeredResponse(msg);
    }
});

function _ghostPositiveResponse(msg) {
    msg.reply("Yes... I am now at rest");
}

function _ghostNegativeResponse(msg) {
    msg.reply("NO!!! _SHRIEKING_");
}

function _ghostTriggeredResponse(msg) {
    msg.react('👻');
}

client.login(auth.discord_token);
