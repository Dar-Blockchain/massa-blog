import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Args,
  SmartContract,
  OperationStatus,
  Mas,
} from "@massalabs/massa-web3";
import { Profile } from "../../struct/Profile";
import { Comment } from "../../struct/Comment";
import { toast } from "react-toastify";

interface UserState {
  mode: "light" | "dark";
  user: Profile | null;
  userContractAddress: string | undefined;
  walletConnection: {
    address: string;
    providerName: string;
  } | null;
}

const initialState: UserState = {
  mode: "light",
  user: null,
  userContractAddress: undefined,
  walletConnection: null,
};

export const checkUserProfile = createAsyncThunk<
  Profile | null,
  any // Use the correct type for connectedAccount (e.g., ConnectedAccount)
>("user/checkUserProfile", async (connectedAccount) => {
  if (!connectedAccount) {
    return null;
  }

  try {
    const contractAddress = import.meta.env.VITE_FACTORY_ADDRESS;
    const args = new Args().addString(connectedAccount.address);
    const contract = new SmartContract(connectedAccount, contractAddress);
    const result = await contract.read("getProfile", args);

    if (result.info.error) {
      console.error("Smart contract error:", result.info.error);
      return null;
    }
    if (!result.value || result.value.length === 0) {
      return null;
    }

    console.log("result value for get user profile", result.value);
    const argsForDeserialization = new Args(result.value);
    const profile = argsForDeserialization.nextSerializable<Profile>(Profile);
    console.log("profile", profile);

    if (!profile || !profile.firstName) {
      return null;
    }

    return profile;
  } catch (error) {
    console.error("Error checking user profile:", error);
    return null;
  }
});

export const createProfile = createAsyncThunk<
  Profile,
  { connectedAccount: any; profileData: Profile }
>("user/createProfile", async ({ connectedAccount, profileData }) => {
  if (!connectedAccount) {
    throw new Error("Missing wallet or connected account.");
  }
  const toastId = toast.loading("Creating your profile...");
  try {
    const contractAddress = import.meta.env.VITE_FACTORY_ADDRESS;
    const contract = new SmartContract(connectedAccount, contractAddress);
    toast.update(toastId, {
      render: "Preparing profile data...",
    });
    const args = new Args().addSerializable(profileData).serialize();
    toast.update(toastId, {
      render: "Sending transaction...",
    });
    // const args = new Args()
    //   .addString(profileData.firstName)
    //   .addString(profileData.lastName)
    //   .addString(profileData.profilePicUrl)
    //   .addString(profileData.bio)
    //   .addString(profileData.coverPhotoUrl)
    //   .addString(profileData.email)
    //   .addString(profileData.facebook)
    //   .addString(profileData.twitter)
    //   .addString(profileData.linkedin)
    //   .addString(profileData.instagram)
    //   .addString(profileData.website)
    //   .serialize();
    const operation = await contract.call("createProfile", args, {
      coins: Mas.fromString("10"),
    });
    toast.update(toastId, {
      render: "Waiting for confirmation...",
    });
    const operationStatus = await operation.waitSpeculativeExecution();
    const speculativeEvents = await operation.getSpeculativeEvents();
    if (operationStatus === OperationStatus.SpeculativeSuccess) {
      console.log("Speculative success:", speculativeEvents);
      toast.update(toastId, {
        render: "Profile created successfully! 🎉",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      // return profileData;
    } else {
      console.error("Operation failed:", speculativeEvents);
      toast.update(toastId, {
        render: "Failed to create profile",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      throw new Error("Operation failed");
    }

    return profileData;
  } catch (error) {
    console.error("Error creating profile:", error);
    toast.update(toastId, {
      render: "Failed to create profile",
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });
    throw new Error("Error creating profile");
  }
});

// Add new action for updating profile
export const updateProfile = createAsyncThunk<
  any,
  { connectedAccount: any; profileDataToUpdate: any }
>("user/updateProfile", async ({ connectedAccount, profileDataToUpdate }) => {
  if (!connectedAccount) {
    throw new Error("Missing wallet or connected account.");
  }
  try {
    const contractAddress = import.meta.env.VITE_FACTORY_ADDRESS;
    const contract = new SmartContract(connectedAccount, contractAddress);
    const args = new Args()
      .addString(connectedAccount.address) // userAddress
      .addString(connectedAccount.address) // newUserAddress
      .addString(profileDataToUpdate.firstName) // newFirstName
      .addString(profileDataToUpdate.lastName) // newLastName
      .addString(profileDataToUpdate.profilePicUrl) // newProfilePicUrl
      .addString(profileDataToUpdate.bio) // newBio
      .addString(profileDataToUpdate.coverPhotoUrl) // newCoverPhotoUrl
      .addString(profileDataToUpdate.email) // newEmail
      .addString(profileDataToUpdate.facebook) // newFacebook
      .addString(profileDataToUpdate.twitter) // newTwitter
      .addString(profileDataToUpdate.linkedin) // newLinkedin
      .addString(profileDataToUpdate.instagram) // newInstagram
      .addString(profileDataToUpdate.website) // newWebsite
      .serialize();

    const operation = await contract.call("updateProfile", args, {
      coins: Mas.fromString("10"),
    });
    const operationStatus = await operation.waitSpeculativeExecution();
    const speculativeEvents = await operation.getSpeculativeEvents();

    if (operationStatus === OperationStatus.SpeculativeSuccess) {
      console.log("Update success:", speculativeEvents);
      toast.success("Profile updated successfully!");
      return profileDataToUpdate;
    } else {
      toast.error("Failed to update profile");
      throw new Error("Update operation failed");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error("Failed to update profile");
    throw new Error("Error updating profile");
  }
});

// Add new action for adding comments
export const addComment = createAsyncThunk<
  boolean,
  { 
    connectedAccount: any; 
    authorAddress: string; // Add author address parameter
    postId: bigint; 
    text: string; 
    parentCommentId?: bigint;
  }
>("user/addComment", async ({ connectedAccount, authorAddress, postId, text, parentCommentId }) => {
  if (!connectedAccount) {
    throw new Error("Missing wallet or connected account.");
  }
  
  if (!authorAddress) {
    throw new Error("Author address is required.");
  }
  
  const toastId = toast.loading("Adding comment...");
  
  try {
    console.log('Adding comment to post:', postId, 'from author:', authorAddress);
    
    const factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS;
    const contract = new SmartContract(connectedAccount, factoryAddress);
    
    toast.update(toastId, {
      render: "Preparing comment data...",
    });
    
    const args = new Args()
      .addString(authorAddress)
      .addU64(postId)
      .addString(text);
    
    // Add parent comment ID if this is a reply
    if (parentCommentId !== undefined) {
      args.addU64(parentCommentId);
    }
    
    toast.update(toastId, {
      render: "Sending transaction...",
    });
    
    console.log("args", args.serialize());
    const operation = await contract.call("addPostComment", args.serialize(), {
      coins: Mas.fromString("0.01"), // Small fee for commenting
    });
    
    toast.update(toastId, {
      render: "Waiting for confirmation...",
    });
    
    const operationStatus = await operation.waitFinalExecution();
    
    if (operationStatus === OperationStatus.Success) {
      console.log("Comment added successfully");
      toast.update(toastId, {
        render: "Comment added successfully! 🎉",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      return true;
    } else {
      console.error("Operation failed with status:", operationStatus);
      toast.update(toastId, {
        render: "Failed to add comment",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      throw new Error("Operation failed");
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    toast.update(toastId, {
      render: error instanceof Error ? error.message : "Failed to add comment",
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });
    throw new Error("Error adding comment");
  }
});

// Add new action for getting comment replies
export const getCommentReplies = createAsyncThunk<
  Comment[],
  {
    connectedAccount: any;
    authorAddress: string;
    selectionPart?: number;
    commentId: bigint;
  }
>("user/getCommentReplies", async ({ connectedAccount, authorAddress, selectionPart = 1, commentId }) => {
  if (!connectedAccount) {
    throw new Error("Missing wallet or connected account.");
  }

  if (!authorAddress) {
    throw new Error("Author address is required.");
  }

  try {
    console.log('Getting comment replies for comment:', commentId, 'from author:', authorAddress);
    
    const factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS;
    const contract = new SmartContract(connectedAccount, factoryAddress);
    
    const args = new Args()
      .addString(authorAddress)
      .addU64(BigInt(selectionPart))
      .addU64(commentId);

    const result = await contract.read('getCommentReplies', args.serialize());

    if (result.value) {
      const comments = new Args(result.value).nextSerializableObjectArray<Comment>(Comment);
      return comments;
    } else {
      throw new Error('Failed to get comment replies');
    }
  } catch (error) {
    console.error("Error getting comment replies:", error);
    throw new Error("Error getting comment replies");
  }
});

// Add new action for getting post comments
export const getPostComments = createAsyncThunk<
  Comment[],
  {
    connectedAccount: any;
    authorAddress: string;
    postId: bigint;
    selectionPart?: number;
  }
>("user/getPostComments", async ({ connectedAccount, authorAddress, postId, selectionPart = 1 }) => {
  if (!connectedAccount) {
    throw new Error("Missing wallet or connected account.");
  }

  if (!authorAddress) {
    throw new Error("Author address is required.");
  }

  try {
    console.log('Getting comments for post:', postId, 'from author:', authorAddress);
    
    const factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS;
    const contract = new SmartContract(connectedAccount, factoryAddress);
    
    const args = new Args()
      .addString(authorAddress)
      .addU64(postId)
      .addU64(BigInt(selectionPart));

    const result = await contract.read('getPostComments', args.serialize());

    if (result.value) {
      const comments = new Args(result.value).nextSerializableObjectArray<Comment>(Comment);
      console.log('comments,,,,,,,,,,,,,,,,,', comments);
      return comments;
    } else {
      throw new Error('Failed to get post comments');
    }
  } catch (error) {
    console.error("Error getting post comments:", error);
    throw new Error("Error getting post comments");
  }
});

// Add new action for liking comments
export const likeComment = createAsyncThunk<
  boolean,
  {
    connectedAccount: any;
    authorAddress: string;
    commentId: bigint;
  }
>("user/likeComment", async ({ connectedAccount, authorAddress, commentId }) => {
  if (!connectedAccount) {
    throw new Error("Missing wallet or connected account.");
  }

  if (!authorAddress) {
    throw new Error("Author address is required.");
  }

  const toastId = toast.loading("Liking comment...");

  try {
    console.log('Liking comment:', commentId, 'from author:', authorAddress);
    
    const factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS;
    const contract = new SmartContract(connectedAccount, factoryAddress);
    
    const args = new Args()
      .addString(authorAddress)
      .addU64(commentId);

    const operation = await contract.call('likeComment', args.serialize(), {
      coins: Mas.fromString('0.01'),  // Small fee for liking
    });

    const operationStatus = await operation.waitFinalExecution();

    if (operationStatus === OperationStatus.Success) {
      console.log('Comment liked successfully');
      toast.update(toastId, {
        render: "Comment liked successfully! 🎉",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      return true;
    } else {
      console.error('Operation failed with status:', operationStatus);
      toast.update(toastId, {
        render: "Failed to like comment",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      throw new Error("Operation failed");
    }
  } catch (error) {
    console.error("Error liking comment:", error);
    toast.update(toastId, {
      render: error instanceof Error ? error.message : "Failed to like comment",
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });
    throw new Error("Error liking comment");
  }
});

// Add new action for getting comment likes
export const getCommentLikes = createAsyncThunk<
  bigint,
  {
    connectedAccount: any;
    authorAddress: string;
    commentId: bigint;
  }
>("user/getCommentLikes", async ({ connectedAccount, authorAddress, commentId }) => {
  if (!connectedAccount) {
    throw new Error("Missing wallet or connected account.");
  }

  if (!authorAddress) {
    throw new Error("Author address is required.");
  }

  try {
    console.log('Getting likes count for comment:', commentId, 'from author:', authorAddress);
    
    const factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS;
    const contract = new SmartContract(connectedAccount, factoryAddress);
    
    const args = new Args()
      .addString(authorAddress)
      .addU64(commentId);

    const result = await contract.read('getCommentLikes', args.serialize());

    if (result.value) {
      const likesCount = new Args(result.value).nextU64();
      console.log('Comment has', likesCount.toString(), 'likes');
      return likesCount;
    } else {
      throw new Error('Failed to get comment likes count');
    }
  } catch (error) {
    console.error("Error getting comment likes:", error);
    throw new Error("Error getting comment likes");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserContractAddress: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.userContractAddress = action.payload;
    },
    setWalletConnection: (
      state,
      action: PayloadAction<{ address: string; providerName: string } | null>
    ) => {
      state.walletConnection = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(checkUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setMode, setUser, setUserContractAddress, setWalletConnection } = userSlice.actions;

export default userSlice.reducer;
