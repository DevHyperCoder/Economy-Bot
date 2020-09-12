import { Client } from "discord.js";
import { config } from 'dotenv'
import { createConnection } from "typeorm";

// load all the commands
import bank from './commands/bank';
import wallet from './commands/wallet'
import beg from './commands/beg';
import transfer from './commands/transfer'

// Import entities
import {User} from './entities/User'

import {checkIfUserExists,createUser} from './entityHelpers/UserHelper'

import path from 'path'

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
client.on('message',async msg => {
    // Check if the author is the bot
    if(msg.author.bot) return;

    // Check if the msg starts with the prefix
    if (!msg.content.startsWith(prefix)) return;

    // Split args and commands
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Create a account for the user if it does not exist
    const discordUserId  = msg.author.id;

    if(!await checkIfUserExists(discordUserId)){
        // Create a new user
        await createUser(discordUserId);
        console.log(`Created account with discord id: ${discordUserId}`);
    }

    // Switch based on command
    switch(command){
        case "bank":
            await bank(msg,args)
            break;
        case "wallet":
            await wallet(msg,args)
            break;
        case 'beg':
            await beg(msg,args);
            break;
        case 'transfer':
            await transfer(msg,args)
            break;
        case "help":
            await msg.reply("Developer is working on it")
            break;
        default:
            msg.reply('Please use a valid command')
    }
})

// Setup typeorm
setupTypeORM();

async function setupTypeORM(){
    await createConnection({
        type:'postgres',
        url:process.env.DATABASE_URL,
        logging:true,
        synchronize:true,
        migrations: [path.join(__dirname, './migrations/*')],
        entities: [User]
    });

}

// Log in with the API KEY
client.login(process.env.DISCORD_KEY);
