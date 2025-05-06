import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Args,
  SmartContract,
  OperationStatus,
  Mas,
} from "@massalabs/massa-web3";
import { Profile } from "../../struct/Profile";
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
