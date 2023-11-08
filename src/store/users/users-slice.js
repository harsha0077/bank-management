const { createSlice } = require("@reduxjs/toolkit");

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
  },
  reducers: {
    getUserDetails: (currentSlice, action) => {
      currentSlice.users.push(action.payload);
    },
    updateUserDetails: (currentSlice, action) => {
      const indexToUpdate = currentSlice.users.findIndex(
        (users) => users.id === action.payload.id
      );
      currentSlice.users[indexToUpdate] = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { getUserDetails, updateUserDetails } = userSlice.actions;
