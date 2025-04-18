// blogSlice.js - Redux slice for managing blog-related state (fetching, updating, and deleting blogs).
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  getBlogs } from './blogAPI';

// Initial state for the blog slice, includes loading and error states
const initialState = {
  blogs: [], // Stores the list of blogs
  loading: false, // Tracks loading state for async operations
  error: null, // Stores error messages from failed requests
  clickedBlogId: null, // Tracks the ID of the clicked blog for display
};

// Thunk action to fetch all blogs with optional filters
export const fetchBlogs = createAsyncThunk('blogs/fetchAll', async (filters) => {
  const res = await getBlogs(filters || {}); // Fetch blogs with the given filters or an empty filter
  return res.data; // Return the fetched blog data
});

// Reducer slice for handling blog-related state changes
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // Action to set the ID of the clicked blog
    setClickedBlogId: (state, action) => {
      state.clickedBlogId = action.payload; // Store clicked blog ID in state
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state during blog fetching
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true; // Set loading to true while fetching blogs
      })
      // Handle successful blog fetch response
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when data is fetched
        state.blogs = action.payload; // Store the fetched blogs in state
      })
      // Handle fetch blogs failure
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false; // Set loading to false when an error occurs
        state.error = action.error.message; // Store the error message in state
      });
  },
});

// Export action to set clicked blog ID
export const { setClickedBlogId } = blogSlice.actions;

export default blogSlice.reducer;
