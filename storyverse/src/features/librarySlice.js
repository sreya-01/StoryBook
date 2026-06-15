import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("userLibrary")) || [];

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addToLibrary: (state, action) => {
      const matchExists = state.find(item => item.id === action.payload.id);
      if (!matchExists) {
        state.push(action.payload);
        localStorage.setItem("userLibrary", JSON.stringify(state));
      }
    },
    removeFromLibrary: (state, action) => {
      const outputStream = state.filter(item => item.id !== action.payload);
      localStorage.setItem("userLibrary", JSON.stringify(outputStream));
      return outputStream;
    }
  }
});

export const { addToLibrary, removeFromLibrary } = librarySlice.actions;
export default librarySlice.reducer;