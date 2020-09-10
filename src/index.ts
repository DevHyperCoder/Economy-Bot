import { Client } from "discord.js";
import { config } from 'dotenv'
import { Console } from "console";

// Load env variables
config()

// Create a new discord client
const client = new Client();

// ready event
client.on('ready',()=>{
    console.log(`I am online. I am ${client.user.tag}`)
})

// Runs on every single message
client.on('message',msg =>{
    console.log(msg.author.username)
    console.log(msg.content)
})

// Log in with the API KEY
client.login(process.env.DISCORD_KEY);
