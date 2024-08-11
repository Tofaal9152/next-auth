import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-center">
      <h2 className="text-6xl font-semibold text-gray-800 mb-4">404</h2>
      <h3 className="text-2xl font-medium text-gray-600 mb-2">
        Page Not Found
      </h3>
      <p className="text-lg text-gray-500 mb-6">
        The page you are looking for doesn't exist
      </p>
      <Link className="bg-black px-3 py-2 rounded-md hover:scale-105 duration-200" href="/">
        <p className="text-white font-semibold text-lg">Return Home</p>
      </Link>
    </div>
  );
};

export default NotFound;
