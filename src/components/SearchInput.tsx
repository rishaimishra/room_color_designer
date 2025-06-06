import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  onSearch: (code: string) => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [searchCode, setSearchCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode.trim()) {
      onSearch(searchCode.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            placeholder="Enter color code (e.g., 9770)"
            className="w-full px-4 py-3 pr-12 text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 shadow-sm"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50"
          >
            <Search className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      </form>
      
      <div className="mt-3 text-center">
        <p className="text-sm text-gray-600">
          Try: <button 
            onClick={() => { setSearchCode('9770'); onSearch('9770'); }}
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            9770
          </button>, <button 
            onClick={() => { setSearchCode('8801'); onSearch('8801'); }}
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            8801
          </button>, or <button 
            onClick={() => { setSearchCode('7701'); onSearch('7701'); }}
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            7701
          </button>
        </p>
      </div>
    </div>
  );
};

export default SearchInput;