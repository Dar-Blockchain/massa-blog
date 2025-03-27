import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  Args,
  SmartContract,
  DeserializedResult,
  Serializable,
  OperationStatus,
  Mas,
  parseMas,
  bytesToStr,
} from "@massalabs/massa-web3";
import { Profile } from "../../struct/Profile";

interface UserState {
  mode: "light" | "dark";
  user: Profile | null;
  userContractAddress: string | undefined;
}

const initialState: UserState = {
  mode: "light",
  user: null,
  userContractAddress: undefined,
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
    // if (result.value.length === 0) {
    //   return null; // No profile exists
    // }
    console.log("result value for get user profile", result.value);
    const argsForDeserialization = new Args(result.value);
    const profile = argsForDeserialization.nextSerializable<Profile>(Profile);
    console.log("profile", profile);

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
  try {
    const contractAddress = import.meta.env.VITE_FACTORY_ADDRESS;
    const contract = new SmartContract(connectedAccount, contractAddress);
    const args = new Args().addSerializable(profileData).serialize();
    // const args = new Args()
    //   .addString(profileData.firstName)
    //   .addString(profileData.lastName)
    //   .addString(profileData.bio)
    //   .addString(profileData.profilePicUrl)
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
    const operationStatus = await operation.waitSpeculativeExecution();
    const speculativeEvents = await operation.getSpeculativeEvents();
    if (operationStatus === OperationStatus.SpeculativeSuccess) {
      console.log("Speculative success:", speculativeEvents);
      // return profileData;
    } else {
      console.error("Operation failed:", speculativeEvents);
      throw new Error("Operation failed");
    }

    return profileData;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw new Error("Error creating profile");
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
  },

  extraReducers: (builder) => {
    builder.addCase(checkUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setMode, setUser, setUserContractAddress } = userSlice.actions;

export default userSlice.reducer;
