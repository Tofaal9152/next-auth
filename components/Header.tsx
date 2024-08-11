"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const Header = () => {
    const router = useRouter()
  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      router.push('/login')
      toast.success(res.data.message);
    } catch (error:any) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">MyApp</div>
      <div className="space-x-4">
        <button
          onClick={logoutHandler}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
        <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
          Login
        </button>
        <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">
          Register
        </button>
      </div>
    </nav>
  );
};

export default Header;
