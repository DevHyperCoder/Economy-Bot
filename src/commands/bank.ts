import { Message, MessageEmbed } from "discord.js";
import { getUser } from '../entityHelpers/UserHelper'

export default async function bank(msg: Message, args: string[]) {
    const user = (await getUser(msg.author.id));
    const embed = new MessageEmbed()
    embed.setTitle(`${msg.author.username}'s Bank Balance`)
    embed.addFields({
        name:"Bank Balance", value:user.bank})
    msg.channel.send(embed)
}