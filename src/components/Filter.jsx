import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { FiArrowDown, FiArrowUp, FiRefreshCw } from 'react-icons/fi';
import { MdSearch } from 'react-icons/md';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Filter = () => {
  // Initial category options
  const initialCategories = [
    { categoryId: 1, categoryName: "Smart Watch" },
    { categoryId: 2, categoryName: "Headphones" },
    { categoryId: 3, categoryName: "Laptop" },
    { categoryId: 4, categoryName: "Electronics" },
    { categoryId: 5, categoryName: "Clothing" },
    { categoryId: 6, categoryName: "Furniture" },
    { categoryId: 7, categoryName: "Books" },
    { categoryId: 8, categoryName: "Toys" },
  ];

  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  // Sorted categories alphabetically
  const categories = initialCategories.sort((a, b) =>
    a.categoryName.localeCompare(b.categoryName)
  );

  // Local state for filters
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize filter state from query parameters
  useEffect(() => {
    setCategory(searchParams.get("category") || "all");
    setSortOrder(searchParams.get("sortby") || "asc");
    setSearchTerm(searchParams.get("keyword") || "");
  }, [searchParams]);

  // Update URL with debounce when search term changes
  useEffect(() => {
    const handler = setTimeout(() => {
      /**
       * WHY WE USE `updatedParams` INSTEAD OF MODIFYING `searchParams`:
       *
       * React Router's `useSearchParams()` returns a special, immutable object.
       * Direct mutation (e.g. searchParams.set(...)) and then triggering `navigate(...)`
       * during the render phase causes a React error:
       *
       * > "Cannot update a component (`BrowserRouter`) while rendering a different component (`Filter`)."
       *
       * SOLUTION:
       * We clone the object with `new URLSearchParams(searchParams)` and
       * only call `navigate(...)` from within a controlled effect or event handler.
       */
      const updatedParams = new URLSearchParams(searchParams);

      searchTerm.trim()
        ? updatedParams.set("keyword", searchTerm.trim())
        : updatedParams.delete("keyword");

      navigate(`${pathname}?${updatedParams.toString()}`);
    }, 700);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Handle category selection change
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const updatedParams = new URLSearchParams(searchParams);

    selectedCategory === "all"
      ? updatedParams.delete("category")
      : updatedParams.set("category", selectedCategory);

    navigate(`${pathname}?${updatedParams.toString()}`);
    setCategory(selectedCategory);
  };

  // Clear all query parameters from URL
  const handleClearFilters = () => navigate({ pathname });

  // Toggle sort order and update query string
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("sortby", newOrder);
    navigate(`${pathname}?${updatedParams.toString()}`);
    setSortOrder(newOrder);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between w-full bg-white p-4 rounded-xl shadow-md">
      {/* Search bar input with responsive styles */}
      <div className="relative w-full lg:w-[40%]">
        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 pl-10 pr-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Select dropdown, sort, and clear filter buttons with responsive design */}
      <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-[58%] justify-end items-center">
        <FormControl
          size="medium"
          sx={{
            minWidth: 180,
            width: "100%",
            maxWidth: 240,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              background: 'linear-gradient(to right, #c7d2fe, #e0f2fe)',
              height: 48,
              px: 1,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              '& fieldset': { borderColor: '#93c5fd' },
              '&:hover fieldset': { borderColor: '#6366f1' },
              '&.Mui-focused fieldset': { borderColor: '#4338ca', borderWidth: '2px' },
            },
            '& .MuiInputLabel-root': {
              fontWeight: 600,
              color: '#3b82f6',
              backgroundColor: 'white',
              px: 0.5,
              '&.Mui-focused': { color: '#4338ca' },
            },
            '& .MuiSelect-select': {
              padding: '12px',
              fontWeight: 600,
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort order toggle */}
        <Tooltip title="Sort by price">
          <Button
            onClick={toggleSortOrder}
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #3b82f6, #2563eb)',
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: '0.875rem',
              borderRadius: '12px',
              height: 48,
              px: 2.5,
              width: '100%',
              maxWidth: 160,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              '&:hover': {
                background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
              },
            }}
          >
            Sort by
            {sortOrder === "asc" ? <FiArrowUp size={18} /> : <FiArrowDown size={18} />}
          </Button>
        </Tooltip>

        {/* Clear filters button */}
        <Button
          variant="contained"
          onClick={handleClearFilters}
          sx={{
            background: 'linear-gradient(to right, #dc2626, #b91c1c)',
            color: '#fff',
            textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: '0.875rem',
            borderRadius: '12px',
            height: 48,
            px: 2.5,
            width: '100%',
            maxWidth: 160,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              background: 'linear-gradient(to right, #b91c1c, #7f1d1d)',
            },
          }}
        >
          Clear
          <FiRefreshCw size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Filter;
