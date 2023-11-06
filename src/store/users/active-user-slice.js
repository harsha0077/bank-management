const { createSlice } = require("@reduxjs/toolkit");

export const activeUserSlice = createSlice({
  name: "activeUserSlice",
  initialState: {
    activeUsers: [],
  },
  reducers: {
    getactiveUserDetails: (currentSlice, action) => {
      currentSlice.activeUsers.push(...action.payload);
    },
    updateactiveUserDetails: (currentSlice, action) => {
      const indexToUpdate = currentSlice.activeUsers.findIndex(
        (user) => user.id === action.payload.id
      );
      currentSlice.activeUsers[indexToUpdate] = action.payload;
    },
    clearactiveUserDetails: (currentSlice) => {
      currentSlice.activeUsers = [];
    },
  },
});

export const activeUserReducer = activeUserSlice.reducer;

export const {
  getactiveUserDetails,
  updateactiveUserDetails,
  clearactiveUserDetails,
} = activeUserSlice.actions;
