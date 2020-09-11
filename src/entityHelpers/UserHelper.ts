import { User } from '../entities/User';

export async function createUser(discordId: string, wallet?: number, bank?: number): Promise<User> {
    const user = User.create()
    user.discordId = discordId
    user.wallet = wallet || 0
    user.bank = bank ||0
    return await user.save()
}

export async function checkIfUserExists(discordId: string): Promise<Boolean> {
    const user = await User.findOne({discordId});
    if (user) {
        return true;
    }
    return false;
}

export async function getUser(discordId:string):Promise<User>{
    return await User.findOne({discordId});
    
}