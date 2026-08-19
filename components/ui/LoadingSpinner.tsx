export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500">{message}</p>
    </div>
  );
}
