import { Args, SmartContract } from "@massalabs/massa-web3";
import { store } from "../redux/store";
import { Post } from "../struct/Post";
import { Category } from "../struct/Category";

export class CategoryService {
  static async getCategories(connectedAccount: any): Promise<Category[]> {
    if (!connectedAccount) {
      throw new Error("No connected account");
    }
    const contractAddress = import.meta.env.VITE_FACTORY_ADDRESS;

    if (!contractAddress) {
      throw new Error("User contract address not found");
    }

    try {
      const contract = new SmartContract(connectedAccount, contractAddress);
      const result = await contract.read("getCategories", new Args());

      if (result.info.error) {
        console.error("Smart contract error:", result.info.error);
        return [];
      }

      if (!result.value || result.value.length === 0) {
        return [];
      }

      const argsForDeserialization = new Args(result.value);
      console.log("Args for deserialization:", argsForDeserialization);

      try {
        const categories =
          argsForDeserialization.nextSerializableObjectArray<Category>(
            Category
          );
        console.log("Deserialized categories:", categories);
        return categories;
      } catch (deserializationError) {
        console.error("Deserialization error:", deserializationError);
        throw deserializationError;
      }
      // return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  static async getPostsByCategory(
    connectedAccount: any,
    categoryId: string,
    page: number = 1
  ): Promise<Post[]> {
    if (!connectedAccount) {
      throw new Error("No connected account");
    }

    const contractAddress = import.meta.env.VITE_FACTORY_ADDRESS;
    if (!contractAddress) {
      throw new Error("User contract address not found");
    }

    try {
      const contract = new SmartContract(connectedAccount, contractAddress);
      const args = new Args()
        .addString(categoryId)
        .addU64(BigInt(page))
        .serialize();

      const result = await contract.read("getPostsByCategory", args);

      if (result.info.error) {
        console.error("Smart contract error:", result.info.error);
        return [];
      }

      if (!result.value || result.value.length === 0) {
        return [];
      }

      const argsForDeserialization = new Args(result.value);
      const posts =
        argsForDeserialization.nextSerializableObjectArray<Post>(Post);
      return posts;
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      return [];
    }
  }
}
