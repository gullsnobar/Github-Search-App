const RepoList = ({ repos, sortBy, darkMode }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      'C++': 'bg-purple-500',
      CSS: 'bg-blue-400',
      HTML: 'bg-orange-500',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-600',
      PHP: 'bg-indigo-500',
      'C#': 'bg-purple-600',
      Ruby: 'bg-red-600',
      Swift: 'bg-orange-400',
      Kotlin: 'bg-purple-400',
      Dart: 'bg-blue-600',
      Vue: 'bg-green-400',
      React: 'bg-blue-400'
    };
    return colors[language] || 'bg-gray-500';
  };

  const cardClasses = darkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  const repoCardClasses = darkMode 
    ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
    : 'bg-gray-50 border-gray-200 hover:bg-white';

  return (
    <div className={`${cardClasses} rounded-2xl shadow-xl p-8 border`}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold">
          Repositories ({repos.length})
        </h3>
        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Sorted by {sortBy.replace('_', ' ')}
        </div>
      </div>

      <div className="grid gap-6">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${repoCardClasses}`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-semibold">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  {repo.private && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                      Private
                    </span>
                  )}
                  {repo.fork && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">
                      Fork
                    </span>
                  )}
                  {repo.archived && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                      Archived
                    </span>
                  )}
                </div>

                {repo.description && (
                  <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {repo.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {repo.language && (
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span>⭐</span>
                    <span>{repo.stargazers_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🍴</span>
                    <span>{repo.forks_count.toLocaleString()}</span>
                  </div>
                  {repo.open_issues_count > 0 && (
                    <div className="flex items-center gap-1">
                      <span>🐛</span>
                      <span>{repo.open_issues_count} issues</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span>📝</span>
                    <span>Updated {formatDate(repo.updated_at)}</span>
                  </div>
                  {repo.size > 0 && (
                    <div className="flex items-center gap-1">
                      <span>💾</span>
                      <span>{(repo.size / 1024).toFixed(1)} MB</span>
                    </div>
                  )}
                  {repo.license && (
                    <div className="flex items-center gap-1">
                      <span>📄</span>
                      <span>{repo.license.name}</span>
                    </div>
                  )}
                </div>

                {/* Topics/Tags */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.slice(0, 5).map((topic, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs rounded-full ${
                            darkMode 
                              ? 'bg-gray-600 text-gray-200' 
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 5 && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-700'
                        }`}>
                          +{repo.topics.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  View
                </a>
                {repo.clone_url && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(repo.clone_url);
                      // You could add a toast notification here
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                      darkMode 
                        ? 'bg-gray-600 text-white hover:bg-gray-500' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    title="Copy clone URL"
                  >
                    Clone
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;