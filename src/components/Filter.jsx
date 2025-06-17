import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import { useState } from 'react';
import { FiArrowUp, FiRefreshCw } from 'react-icons/fi';
import { MdSearch } from 'react-icons/md';

const Filter = () => {
  const initialCategories = [
    { categoryId: 1, categoryName: "Electronics" },
    { categoryId: 2, categoryName: "Clothing" },
    { categoryId: 3, categoryName: "Furniture" },
    { categoryId: 4, categoryName: "Books" },
    { categoryId: 5, categoryName: "Toys" },
  ];

  const categories = initialCategories.sort((a, b) =>
    a.categoryName.localeCompare(b.categoryName)
  );

  const [category, setCategory] = useState("all");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClearFilter = () => {
    setCategory("all");
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4 px-4 py-4 bg-white shadow-md rounded-xl">
      {/* SEARCH BAR */}
      <div className="relative 2xl:w-[450px] sm:w-[420px] w-full">
        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search products"
          className="w-full py-2 pl-10 pr-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* CATEGORY SELECT + SORT + CLEAR FILTER */}
      <div className="flex flex-row items-center gap-4">
        <FormControl
          size="medium"
          sx={{
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              background: 'linear-gradient(to right, #c7d2fe, #e0f2fe)',
              height: 48,
              paddingRight: 1,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              '& fieldset': {
                borderColor: '#93c5fd',
              },
              '&:hover fieldset': {
                borderColor: '#6366f1',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4338ca',
                borderWidth: '2px',
              },
            },
            '& .MuiInputLabel-root': {
              fontWeight: 600,
              color: '#3b82f6',
              backgroundColor: 'white',
              px: 0.5,
              transform: 'translate(14px, -8px) scale(0.75)',
              '&.Mui-focused': {
                color: '#4338ca',
              },
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

        {/* SORT BUTTON */}
        <Tooltip title="Sort by price: ascending">
          <Button
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
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              '&:hover': {
                background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
              },
            }}
          >
            Sort By
            <FiArrowUp size={18} />
          </Button>
        </Tooltip>

        {/* CLEAR FILTER BUTTON */}
        <Button
          variant="contained"
          onClick={handleClearFilter}
          sx={{
            background: 'linear-gradient(to right, #dc2626, #b91c1c)',
            color: '#fff',
            textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: '0.875rem',
            borderRadius: '12px',
            height: 48,
            px: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              background: 'linear-gradient(to right, #b91c1c, #7f1d1d)',
            },
          }}
        >
          Clear Filter
          <FiRefreshCw size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Filter;
