import { Message, MessageEmbed } from "discord.js";
import { getUser } from '../entityHelpers/UserHelper'
import wallet from "./wallet";

import getRandInteger from '../utils/randInt'

// Beg
export default async function beg(msg: Message, args: string[]) {
    // Get random number
    const random = getRandInteger(900, 1000);

    // get msg id 
    const discordId = msg.author.id

    // get the user and update
    const user = await getUser(discordId)
    user.wallet += random;
    await user.save()

    // Generate the embed and reply
    const embed = new MessageEmbed();
    embed.setTitle('Reward!!')
    embed.addField('Reward',random);

    msg.reply(embed);
}