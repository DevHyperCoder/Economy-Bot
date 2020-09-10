import { Message } from "discord.js";

export default function bank(msg:Message,args:string[]){
    console.log(msg.channel)
    console.log(msg.content)
    console.log(msg.reply(msg.content))
}