"use client";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const username = watch("username");
  const password = watch("password");
  const confirmpassword = watch("confirmpassword");

  const isEnabled =
    email && username && password && password === confirmpassword;

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post("api/users/register", data);

      toast.success(res?.data?.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
    reset();
  };
  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-black underline">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-black text-sm mb-2">Username</label>
            <input
              {...register("username", { required: true })}
              type="text"
              className="w-full px-3 text-[1rem] py-[0.47rem] border outline-none focus:border-blue-500 rounded-md"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm mb-2">Email</label>
            <input
              {...register("email", { required: true })}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm mb-2">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              className="w-full px-3 text-[1rem] py-[0.47rem] border  outline-none focus:border-blue-500 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm mb-2">
              Confirm Password
            </label>
            <input
              {...register("confirmpassword", { required: true })}
              type="password"
              className="w-full px-3 text-[1rem] py-[0.47rem] border  outline-none focus:border-blue-500 rounded-md"
              placeholder="Confirm your password"
            />
          </div>

          <button
            disabled={!isEnabled}
            type="submit"
            className={`${
              isEnabled
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            } w-full font-semibold py-[0.6rem] rounded-md  transition duration-300`}
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-black">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
