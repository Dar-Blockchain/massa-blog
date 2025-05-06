import {
    Args,
    SmartContract,
} from "@massalabs/massa-web3";
import { Profile } from "../struct/Profile";

export class AuthorService {
    static async getAuthors(connectedAccount: any): Promise<Profile[]> {
        if (!connectedAccount) {
            throw new Error("Wallet not connected.");
        }

        const contractAddress = import.meta.env.VITE_FACTORY_ADDRESS;

        if (!contractAddress) {
            throw new Error("Smart contract address not found.");
        }

        try {
            const contract = new SmartContract(connectedAccount, contractAddress);
            const result = await contract.read("getAuthors");

            if (result.info.error) {
                console.error("Smart contract error:", result.info.error);
                return [];
            }

            if (!result.value || result.value.length === 0) {
                return [];
            }

            const args = new Args(result.value);
            const authors = args.nextSerializableObjectArray<Profile>(Profile);
            return authors;
        } catch (error) {
            console.error("Error fetching authors:", error);
            return [];
        }
    }
    static async getAuthorProfile(address: string, connectedAccount: any): Promise<Profile | null> {
        if (!address || !connectedAccount) {
            return null;
        }

        const contractAddress = import.meta.env.VITE_FACTORY_ADDRESS;
        if (!contractAddress) {
            throw new Error("Smart contract address not found.");
        }

        try {
            const args = new Args().addString(address);
            const contract = new SmartContract(connectedAccount, contractAddress);
            const result = await contract.read("getProfile", args);

            if (result.info.error) {
                console.error("Smart contract error:", result.info.error);
                return null;
            }

            if (!result.value || result.value.length === 0) {
                return null;
            }

            const argsForDeserialization = new Args(result.value);
            const profile = argsForDeserialization.nextSerializable<Profile>(Profile);

            if (!profile || !profile.firstName) {
                return null;
            }

            return profile;
        } catch (error) {
            console.error("Error fetching profile:", error);
            return null;
        }
    }
    
}
