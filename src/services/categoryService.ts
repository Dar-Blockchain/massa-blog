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
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  static async getPostsByCategoryName(
    connectedAccount: any,
    categoryName: string,
    page: number = 1
  ): Promise<Post[]> {
    if (!connectedAccount) {
      throw new Error("No connected account");
    }

    try {
      

      // Use the existing method with the found category ID
      return this.getPostsByCategory(connectedAccount, categoryName, page);
    } catch (error) {
      console.error("Error fetching posts by category name:", error);
      return [];
    }
  }

  static async getPostsByCategory(
    connectedAccount: any,
    category: string,
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
      console.log('Getting posts for category:', category, 'page:', page);
      const contract = new SmartContract(connectedAccount, contractAddress);
      const args = new Args()
        .addU64(BigInt(page))
        .addString(category);

      const result = await contract.read("getPostsByCategory", args.serialize());

      if (result.value) {
        const posts = new Args(result.value).nextSerializableObjectArray<Post>(Post);
        console.log('Retrieved', posts.length, 'posts in category', category);
        return posts;
      } else {
        console.error('Failed to get posts by category');
        return [];
      }
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      return [];
    }
  }
}
