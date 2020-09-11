import { Message, MessageEmbed } from "discord.js";
import { getUser } from "..//entityHelpers/UserHelper";

export default async  function wallet(msg:Message,args:string[]){
    const discordId = msg.author.id

    const user = await getUser(discordId);
    
    const embed = new MessageEmbed();
    embed.setTitle(`${msg.author.username}'s Wallet`)
    embed.addField("Wallet",user.wallet)

    msg.reply(embed)

}