import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBlog, getBlogs, updateBlog, deleteBlog } from './blogAPI';

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  clickedBlogId: null, // State to store clicked blog ID
};

export const fetchBlogs = createAsyncThunk('blogs/fetchAll', async (filters) => {
  const res = await getBlogs(filters || {});
  return res.data;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setClickedBlogId: (state, action) => {
      state.clickedBlogId = action.payload; // Set the clicked blog ID in the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setClickedBlogId } = blogSlice.actions;

export default blogSlice.reducer;
