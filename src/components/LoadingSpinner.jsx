const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin absolute top-2 left-2 animate-reverse"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-600">
        Searching GitHub...
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Fetching user data and repositories
      </p>
    </div>
  );
};

export default LoadingSpinner;