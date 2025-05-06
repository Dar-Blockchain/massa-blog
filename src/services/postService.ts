import {
  Args,
  SmartContract,
  OperationStatus,
  Mas,
} from "@massalabs/massa-web3";
import { Post } from "../struct/Post";
import { toast } from "react-toastify";
import { calculateStorageCost } from "../lib/CalculateStorageCost";
import { store } from "../redux/store";

export class PostService {
  static async createPost(connectedAccount: any, postData: any): Promise<Post> {
    if (!connectedAccount) {
      throw new Error("Missing wallet or connected account.");
    }

    const userContractAddress = store.getState().user.user?.profileContract;

    if (!userContractAddress) {
      throw new Error("User contract address not found");
    }

    const toastId = toast.loading("Creating post...");

    try {
      const contract = new SmartContract(connectedAccount, userContractAddress);
      const args = new Args()

        .addString(postData.title)
        .addString(postData.excerpt)
        .addString(postData.content)
        .addString(postData.featuredImage)
        .addString(postData.categoryId)
        .addU64(BigInt(postData.readingTime))
        .addString(postData.tags)
        .serialize();
      console.log("postData", postData);
      toast.update(toastId, {
        render: "Calculating storage cost...",
      });
      const storageCost = await calculateStorageCost(postData);
      toast.update(toastId, {
        render: "Sending transaction...",
      });
      const operation = await contract.call("createPost", args, {
        coins: Mas.fromString(storageCost.toString()),
      });
      toast.update(toastId, {
        render: "Waiting for confirmation...",
      });

      const operationStatus = await operation.waitSpeculativeExecution();
      const speculativeEvents = await operation.getSpeculativeEvents();

      if (operationStatus === OperationStatus.SpeculativeSuccess) {
        console.log("Post creation success:", speculativeEvents);
        toast.update(toastId, {
          render: "Post created successfully! 🎉",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        return postData;
      } else {
        console.error("Operation failed:", speculativeEvents);
        toast.error("Failed to create post");
        throw new Error("Operation failed");
      }
    } catch (error: any) {
      console.error("Error creating post:", error);
      let errorMessage = "Failed to create post";
      if (error.message?.includes("was rejected by the user")) {
        errorMessage = "Transaction rejected by user";
      } else if (error.message?.includes("timeout")) {
        errorMessage = "Transaction timed out";
      }

      // Always clean up the loading toast
      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });

      throw error;
    }
  }

  static async getUserPosts(connectedAccount: any): Promise<Post[]> {
    if (!connectedAccount) {
      return [];
    }
    const userContractAddress = store.getState().user.userContractAddress;

    if (!userContractAddress) {
      return [];
    }

    try {
      const args = new Args().addString(connectedAccount.address);
      const contract = new SmartContract(connectedAccount, userContractAddress);
      const result = await contract.read("getUserPosts", args);

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
      console.error("Error fetching user posts:", error);
      return [];
    }
  }

  static async getPosts(
    connectedAccount: any,
    page: number = 1
  ): Promise<Post[]> {
    if (!connectedAccount) {
      throw new Error("No connected account");
    }

    const userContractAddress = store.getState().user.user?.profileContract;
    if (!userContractAddress) {
      throw new Error("User contract address not found");
    }

    try {
      const contract = new SmartContract(connectedAccount, userContractAddress);
      const args = new Args().addU64(BigInt(page)).serialize();

      const result = await contract.read("getPosts", args);

      if (result.info.error) {
        console.error("Smart contract error:", result.info.error);
        return [];
      }

      if (!result.value || result.value.length === 0) {
        return [];
      }

      console.log("result", result.value);

      const argsForDeserialization = new Args(result.value);
      const posts =
        argsForDeserialization.nextSerializableObjectArray<Post>(Post);
      console.log("posts", posts);
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }

  static async getPost(
    connectedAccount: any,
    postId: bigint
  ): Promise<Post | null> {
    if (!connectedAccount) {
      throw new Error("No connected account");
    }

    const userContractAddress = store.getState().user.user?.profileContract;
    if (!userContractAddress) {
      throw new Error("User contract address not found");
    }

    try {
      const contract = new SmartContract(connectedAccount, userContractAddress);
      const args = new Args().addU64(postId).serialize();

      const result = await contract.read("getPost", args);

      if (result.info.error) {
        console.error("Smart contract error:", result.info.error);
        return null;
      }

      if (!result.value || result.value.length === 0) {
        return null;
      }

      const argsForDeserialization = new Args(result.value);
      const post = argsForDeserialization.nextSerializable<Post>(Post);
      return post;
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  }
  
}
