const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
      <div className="flex items-center">
        <span className="text-2xl mr-3">❌</span>
        <p className="text-red-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;