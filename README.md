# OuijaBot -- a haunting game for Discord
---

OuijaBot is a bot for Discord that can be plugged into a server to start a spooky game with the members.


## The game
The bot will periodically raise a spirit unable to rest until the server is able to determine what keeps the spirit awake. The spirit provides clues by reacting to messages containing keyword clues. Any member who believes they have sussed out what has kept the spirit from their peaceful slumber can make a guess with "!spirit <guess>". If they guess correctly, the spirit will be put to rest and the bot will schedule a new spirit for some time in the future.

## How to use the code
First, create a bot from Discord's Application management page (https://discordapp.com/developers/applications/) and invite it to a server you would like to use the bot on.

Then, create a file `src/auth.json` to store credentials needed by the bot. Here is a template for the file:
```
{
    "discord_token": <DISCORD_BOT_TOKEN>
}
```

Finally, run `node src/bot.js`. The bot will now be up and running, so you can start playing!
