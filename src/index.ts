import { Client } from "discord.js";
import { config } from 'dotenv'

// load all the commands
import bank from './commands/bank';
import wallet from './commands/wallet'
// Load env variables
config()

// Get the prefix
const prefix = process.env.PREFIX;

// Create a new discord client
const client = new Client();

// ready event
client.on('ready',()=>{
    console.log(`I am online. I am ${client.user.tag}`)
})

// Runs on every single message
client.on('message',msg =>{
    // Check if the author is the bot
    if(msg.author.bot) return;

    // Check if the msg starts with the prefix
    if (!msg.content.startsWith(prefix)) return;

    // Split args and commands
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Switch based on command
    switch(command){
        case "bank":
            bank(msg,args)
            break;
        
        case "wallet":
            wallet(msg,args)
            break;
        
        case "help":
            msg.reply("Developer is working on it")
            break;
        default:
            msg.reply('Please use a valid command')
    }
})

// Log in with the API KEY
client.login(process.env.DISCORD_KEY);
