import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import { useEffect, useState, useTransition } from 'react';
import { flushSync } from 'react-dom';
import { FiArrowDown, FiArrowUp, FiRefreshCw } from 'react-icons/fi';
import { MdSearch } from 'react-icons/md';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Filter = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  // ✅ Sort categories alphabetically by name
  const sortedCategories = [...categories].sort((a, b) =>
    a.categoryName.localeCompare(b.categoryName)
  );

  // 🔘 States for category, sort order, and search input
  const [category, setCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // ⏳ React 19: optimize state transitions
  const [isPending, startTransition] = useTransition();

  // 🧠 Load initial filter states from URL query params
  useEffect(() => {
    setCategory(searchParams.get('category') || 'all');
    setSortOrder(searchParams.get('sortby') || 'asc');
    setSearchTerm(searchParams.get('keyword') || '');
  }, [searchParams]);

  // ⌛ Debounced update for search input (700ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      const updatedParams = new URLSearchParams(searchParams);
      searchTerm.trim()
        ? updatedParams.set('keyword', searchTerm.trim())
        : updatedParams.delete('keyword');
      navigate(`${pathname}?${updatedParams.toString()}`);
    }, 700);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 🔄 Handle category selection
  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    flushSync(() => setCategory(selected)); // ensures state updates immediately before paint
  };

  // 🔁 Update URL when category changes
  useEffect(() => {
    if (category === (searchParams.get('category') || 'all')) return;

    startTransition(() => {
      const updatedParams = new URLSearchParams(searchParams);
      category === 'all'
        ? updatedParams.delete('category')
        : updatedParams.set('category', category);
      navigate(`${pathname}?${updatedParams.toString()}`);
    });
  }, [category]);

  // ❌ Clear all filters and reset URL
  const handleClearFilters = () => {
    startTransition(() => {
      navigate({ pathname });
    });
  };

  // 🔀 Toggle sort order (asc <-> desc)
  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('sortby', newOrder);

    startTransition(() => {
      navigate(`${pathname}?${updatedParams.toString()}`);
    });

    setSortOrder(newOrder);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between w-full bg-white p-4 rounded-xl shadow-md">
      {/* 🔍 Search bar input */}
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

      {/* ⬇️ Dropdown and sorting buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-[58%] justify-end items-center">
        {/* 🧾 Category dropdown */}
        <FormControl
          size="medium"
          sx={{
            minWidth: 180,
            width: '100%',
            maxWidth: 240,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              background: 'linear-gradient(to right, #c7d2fe, #e0f2fe)',
              height: 48,
              px: 1,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              '& fieldset': { borderColor: '#93c5fd' },
              '&:hover fieldset': { borderColor: '#6366f1' },
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
            {sortedCategories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* ⬆️⬇️ Sort by price */}
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
            {sortOrder === 'asc' ? <FiArrowUp size={18} /> : <FiArrowDown size={18} />}
          </Button>
        </Tooltip>

        {/* ❌ Clear filters button */}
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