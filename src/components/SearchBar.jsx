const SearchBar = ({
  username,
  setUsername,
  onSearch,
  loading,
  searchHistory,
  sortBy,
  setSortBy,
  repoType,
  setRepoType,
  darkMode
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const cardClasses = darkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  return (
    <div className={`${cardClasses} rounded-2xl shadow-xl p-8 mb-8 border`}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`w-full px-6 py-4 rounded-xl text-lg border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/20 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                  : 'bg-gray-50 border-gray-300 focus:border-blue-500'
              }`}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              🔍
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300'
            }`}
          >
            <option value="updated">Recently Updated</option>
            <option value="created">Recently Created</option>
            <option value="pushed">Recently Pushed</option>
            <option value="full_name">Name</option>
          </select>

          <select
            value={repoType}
            onChange={(e) => setRepoType(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300'
            }`}
          >
            <option value="all">All Repos</option>
            <option value="owner">Own Repos</option>
            <option value="member">Member Repos</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={() => onSearch()}
          disabled={loading}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Searching...
            </div>
          ) : (
            'Search'
          )}
        </button>
      </div>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="mt-6">
          <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Recent Searches:
          </p>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((hist, index) => (
              <button
                key={index}
                onClick={() => {
                  setUsername(hist);
                  onSearch(hist);
                }}
                className={`px-3 py-1 rounded-full text-sm transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {hist}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;