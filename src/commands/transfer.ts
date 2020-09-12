import { Message } from "discord.js";
import { createUser, getUser } from "../entityHelpers/UserHelper";

export default async function transfer(msg: Message, args: string[]) {
    const where = args[0]

    switch (where) {
        case 'wallet':
            await transferToWallet(msg, args)
            break;

        case 'bank':
            await transferToBank(msg, args);
            break;

        case 'to':
            await transferToPerson(msg, args)
            break;

        default:
            await msg.reply("pls use valid command!")
            break;
    }
}

async function transferToBank(msg: Message, args: string[]) {
    const user = await getUser(msg.author.id);
    try {
        const amtToTransfer = Number(args[1])
        if (amtToTransfer === NaN) {
            await msg.reply("Enter a number")
            return;
        }
        if (amtToTransfer === 0) {
            await msg.reply('cant transfer empty')
            return
        }
        if (user.wallet < amtToTransfer) {
            await msg.reply('dont have enough')
            return
        }
        user.wallet -= amtToTransfer;
        user.bank += amtToTransfer;
        await user.save()
    }
    catch (e) {
        console.error('problem ', e);
        await msg.reply("Enter a number")
    }
}

async function transferToWallet(msg: Message, args: string[]) {
    const user = await getUser(msg.author.id)
    try {
        const amtToTransfer = Number(args[1])
        if (amtToTransfer === NaN) {
            await msg.reply("Enter a number")
            return;
        }
        if (amtToTransfer === 0) {
            await msg.reply('cant transfer empty')
            return
        }
        if (user.bank < amtToTransfer) {
            await msg.reply('dont have enough')
            return
        }
        user.bank -= amtToTransfer;
        user.wallet += amtToTransfer;
        await user.save()
    }
    catch (e) {
        console.error(e)
        await msg.reply("Enter a number")
    }

}

// Transfer to someone else
async function transferToPerson(msg: Message, args: string[]) {
    // Get the author
    const user = await getUser(msg.author.id);

    // Check if there are no mentions
    if (msg.mentions.users.first() === undefined) {
        await msg.reply("Mention someone");
        return
    }

    // Find the user to send the money to
    let toUser = await getUser(msg.mentions.users.first().id);

    // Create a account if no account found
    if (toUser == undefined) {
        // Create a new account
        toUser = await createUser(msg.mentions.users.first().id);
    }

    // Get the money amount
    const amtToTransfer = Number(args[2])
    if (user.wallet < amtToTransfer) {
        await msg.reply('you dont have enoiugh money')
        return
    }

    // Update values and save
    user.wallet -= amtToTransfer;
    toUser.wallet += amtToTransfer;
    await user.save()
    await toUser.save()

    // Reply
    await msg.reply("Transfered")
}