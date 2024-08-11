"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const email = watch("email");
  const password = watch("password");

  const isButtonDisabled = !email || !password;

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post("api/users/login", data);
      console.log(res);
      
      toast.success(res?.data?.message);
      router.push("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
    reset();
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Log In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">email</label>
            <input
              {...register("email", { required: "email is required" })}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full text-white font-semibold py-2 rounded-md transition duration-300 ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
