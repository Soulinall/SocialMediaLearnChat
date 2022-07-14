import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
      const response = await api.logIn(formValue);
      toast.success("Login successfully");
      navigate("/student");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async ({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
      const response = await api.SignUp(formValue);
      toast.success("Account created successfully");
      navigate("/student");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({profileData, Id, navigate, toast}, {rejectWithValue}) => {
    try {
      console.log("111111111111");
      const response = await api.UpdateProfile(profileData, Id);
      toast.success("Profile updated successfully");
      navigate("/student/profile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const followOne = createAsyncThunk(
  "auth/follow",
  async ({userData, Id, navigate, toast}, {rejectWithValue}) => {
    try {
      console.log("1111111followwwwww");
      console.log(userData);
      const response = await api.followOne(userData, Id);
      toast.success("started following");
      navigate("/student");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFollowersData = createAsyncThunk(
  "auth/getfollowers",
  async ({Id, navigate}, {rejectWithValue}) => {
    try {
      console.log("hello get folowers data reached");
      const response = await api.getFollowers(Id);
      navigate("/student/followers");
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFollowingsData = createAsyncThunk(
  "auth/getfollowings",
  async ({Id, navigate}, {rejectWithValue}) => {
    try {
      console.log("hello get followings data reached");
      const response = await api.getFollowings(Id);
      navigate("/student/followings");
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const unFollowOne = createAsyncThunk(
  "auth/unfollow",
  async ({userData, Id, navigate, toast}, {rejectWithValue}) => {
    try {
      console.log("unfollowwwwww");
      console.log(userData);
      const response = await api.unFollowsOne(userData, Id);
      toast.success("started unfollowing");
      navigate("/student");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getStudentProfile = createAsyncThunk(
  "auth/getProfile",
  async ({userId, navigate}, {rejectWithValue}) => {
    try {
      const response = await api.getStudentProfile(userId);
      console.log(response);
      navigate("/student/viewProfile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth", // the name used in the useSelector,also in store
  initialState: {
    user: null,
    profile: null,
    followers: null,
    followings: null,
    error: "",
    loading: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("user setting");
    },

    setLogout: (state, action) => {
      localStorage.removeItem("profile");
      localStorage.removeItem("userToken");
      state.user = null;
    },
  },

  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;

      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      let {token} = action.payload;
      console.log("student login");
      localStorage.setItem("userToken", JSON.stringify(token));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;

      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      let {token} = action.payload;
      console.log("student login");
      localStorage.setItem("userToken", JSON.stringify(token));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [updateProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false;

      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      state.user.result = action.payload;
    },
    [updateProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [followOne.pending]: (state, action) => {
      state.loading = true;
      console.log("follow pending");
    },
    [followOne.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("follow fulfiling");
      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      console.log(action.payload);
      state.user.result = action.payload.user;
      state.profile.user = action.payload.following;
    },
    [followOne.rejected]: (state, action) => {
      console.log("follow rejected");
      state.loading = false;
      state.error = action.payload.message;
    },

    [unFollowOne.pending]: (state, action) => {
      state.loading = true;
      console.log("follow pending");
    },
    [unFollowOne.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("unfollow fulfiling");
      localStorage.setItem("profile", JSON.stringify({...action.payload}));
      console.log(action.payload);
      state.user.result = action.payload.user;
      state.profile.user = action.payload.unfollowing;
    },
    [unFollowOne.rejected]: (state, action) => {
      console.log("unfollow rejected");
      state.loading = false;
      state.error = action.payload.message;
    },

    [getFollowersData.pending]: (state, action) => {
      console.log("get followers pending");
      state.loading = true;
    },
    [getFollowersData.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("get followers fulfilled");
      state.followers = action.payload;
    },
    [getFollowersData.rejected]: (state, action) => {
      state.loading = false;
      console.log("get followers rejected");
      state.error = action.payload.message;
    },

    [getFollowingsData.pending]: (state, action) => {
      console.log("get followings pending");
      state.loading = true;
    },
    [getFollowingsData.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("get followings fulfilled");
      state.followings = action.payload;
    },
    [getFollowingsData.rejected]: (state, action) => {
      state.loading = false;
      console.log("get followings rejected");
      state.error = action.payload.message;
    },

    [getStudentProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getStudentProfile.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("student profile");
      console.log(action.payload);
      state.profile = action.payload;
    },
    [getStudentProfile.rejected]: (state, action) => {
      state.loading = false;
      console.log("hello");
      console.log(action);
      state.error = action.payload.message;
    },
  },
});
export const {setUser, setLogout} = authSlice.actions;

export default authSlice.reducer;
