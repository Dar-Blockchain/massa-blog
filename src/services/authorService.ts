import {
    Args,
    SmartContract,
} from "@massalabs/massa-web3";
import { Profile } from "../struct/Profile";
import { Post } from "../struct/Post";

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
    static async getPostsByAuthor(address: string, connectedAccount: any): Promise<Post[]> {
        if (!address || !connectedAccount) {
            console.warn("Missing address or wallet connection");
            return [];
        }

        const contractAddress = import.meta.env.VITE_FACTORY_ADDRESS;
        if (!contractAddress) {
            throw new Error("Smart contract address not found in env");
        }

        try {
            const sanitizedAddress = address.trim();
            const args = new Args().addString(sanitizedAddress).addU64(BigInt(1));
            const contract = new SmartContract(connectedAccount, contractAddress);

            const result = await contract.read("getPostsByAuthor", args);

            console.log("Smart contract raw result:", result);

            if (result.info.error) {
                console.error("Smart contract returned an error:", result.info.error);
                return [];
            }

            if (!result.value || result.value.length === 0) {
                console.log("No posts returned for author", sanitizedAddress);
                return [];
            }

            try {
                const deserializationArgs = new Args(result.value);
                const posts = deserializationArgs.nextSerializableObjectArray<Post>(Post);

                console.log("✅ Deserialized posts:", posts);
                return posts;
            } catch (deserializationError) {
                console.error("❌ Deserialization failed. Possibly invalid format or field types.");
                console.error("Deserialization error:", deserializationError);
                return [];
            }
        } catch (error) {
            console.error("❌ Error fetching posts by author:", error);
            return [];
        }
    }
    static async getPostById(postId: string | number, authorAddress: string, connectedAccount: any): Promise<Post | null> {
        if (!postId || !connectedAccount || !authorAddress) {
            return null;
        }

        const contractAddress = import.meta.env.VITE_FACTORY_ADDRESS;
        if (!contractAddress) {
            throw new Error("Smart contract address not found.");
        }

        try {
            const parsedId = BigInt(postId);
            const args = new Args()
                .addString(authorAddress.trim()) // ✅ pass author address correctly
                .addU64(parsedId);               // ✅ pass postId

            const contract = new SmartContract(connectedAccount, contractAddress);
            const result = await contract.read("getPostById", args);

            if (result.info.error || !result.value || result.value.length === 0) {
                return null;
            }

            const argsForDeserialization = new Args(result.value);
            const post = argsForDeserialization.nextSerializable<Post>(Post);
            return post;
        } catch (error) {
            console.error("Error fetching post by ID:", error);
            return null;
        }
    }

}
