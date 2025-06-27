import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoList from "./components/RepoList";
import ThemeToggle from "./components/ThemeToggle";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState("updated");
  const [repoType, setRepoType] = useState("all");

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('githubSearchHistory') || '[]');
    const theme = localStorage.getItem('githubSearchTheme') === 'dark';
    setSearchHistory(history);
    setDarkMode(theme);
  }, []);

  const saveToHistory = (username) => {
    const newHistory = [username, ...searchHistory.filter(u => u !== username)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('githubSearchHistory', JSON.stringify(newHistory));
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('githubSearchTheme', newTheme ? 'dark' : 'light');
  };

  const fetchUser = async (searchUsername = username) => {
    if (!searchUsername.trim()) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${searchUsername}`);
      if (!userRes.ok) {
        throw new Error('User not found');
      }
      const userData = await userRes.json();

      let repoUrl = `https://api.github.com/users/${searchUsername}/repos?per_page=20&sort=${sortBy}`;
      if (repoType !== 'all') {
        repoUrl += `&type=${repoType}`;
      }
      
      const repoRes = await fetch(repoUrl);
      const repoData = await repoRes.json();

      setUser(userData);
      setRepos(repoData);
      saveToHistory(searchUsername);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const themeClasses = darkMode 
    ? 'bg-gray-900 text-white min-h-screen' 
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen';

  return (
    <div className={themeClasses}>
      <div className="container mx-auto px-6 md:px-20 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GitHub Explorer
            </h1>
            <p className={`text-lg mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Discover developers and their amazing projects
            </p>
          </div>
          <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
        </div>

        {/* Search Section */}
        <SearchBar
          username={username}
          setUsername={setUsername}
          onSearch={fetchUser}
          loading={loading}
          searchHistory={searchHistory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          repoType={repoType}
          setRepoType={setRepoType}
          darkMode={darkMode}
        />

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* User Profile */}
        {user && <UserCard user={user} darkMode={darkMode} />}

        {/* Repositories */}
        {repos.length > 0 && (
          <RepoList 
            repos={repos} 
            sortBy={sortBy} 
            darkMode={darkMode} 
          />
        )}

        {/* Footer */}
        <div className="text-center mt-12 py-8">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Built with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
