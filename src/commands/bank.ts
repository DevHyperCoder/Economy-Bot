import { Message, MessageEmbed } from "discord.js";
import { getUser } from '../entityHelpers/UserHelper'

export default async function bank(msg: Message, args: string[]) {
    const user = (await getUser(msg.author.id));
    const embed = new MessageEmbed()
    embed.setTitle(`${msg.author.id}'s Bank Balance`)
    embed.addField("Bank Balance", user.bank)
}