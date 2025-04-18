import { useState } from "react";

/**
 * BlogFilter component allows users to filter blog posts based on author and category.
 * It captures input for both fields and triggers the filtering process when the form is submitted.
 * 
 * @param {function} onFilter - Callback function to be called with the filter criteria (author and category).
 */
const BlogFilter = ({ onFilter }) => {
  const [author, setAuthor] = useState("");  // State to manage the 'author' input value
  const [category, setCategory] = useState("");  // State to manage the 'category' input value

  /**
   * Handles form submission and triggers the filter action.
   * Prevents the default form submission and passes the current filter values to the onFilter callback.
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ author, category });  // Pass the filter criteria to the parent component
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 items-center"
    >
      {/* Input field for author filter */}
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}  // Update author state on change
        placeholder="Search by author"
        className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      {/* Input field for category filter */}
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}  // Update category state on change
        placeholder="Search by category"
        className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      {/* Submit button to apply filters */}
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
      >
        Filter
      </button>
    </form>
  );
};

export default BlogFilter;
