import { Message } from "discord.js";
import { getUser } from '../entityHelpers/UserHelper'
import bank from './bank'

// Beg
export default async function beg(msg: Message, args: string[]) {
// Get random number
    const random = getRandInteger(900,1000);

    // get msg id 
    const discordId = msg.author.id

    // get the user and update
    const user = await getUser(discordId)
    user.bank += random;
    await user.save()

    // dispay the balance
    bank(msg, args);
}

function getRandInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }