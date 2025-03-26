import { useDispatch, useSelector } from "react-redux";
import { useRegisterAdminMutation, useLoginAdminMutation } from "../../Redux/Api/AuthApi";
import { useEffect, useState } from "react";
import { setCredentials } from "../../Redux/Slice/AuthSLice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";


const Auth = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [typedQuote, setTypedQuote] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    schoolName: "",
  });

  const [registerAdmin, { isLoading: isRegistering }] = useRegisterAdminMutation();
  const [loginAdmin, { isLoading: isLoggingIn }] = useLoginAdminMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isLogin) {
        response = await loginAdmin({ email: formData.email, password: formData.password }).unwrap();
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 2000,
          theme: theme === "dark" ? "dark" : "light",
        });
      } else {
        response = await registerAdmin(formData).unwrap();
        toast.success("Signup Successful!", {
          position: "top-right",
          autoClose: 2000,
          theme: theme === "dark" ? "dark" : "light",
        });
      }

      dispatch(setCredentials(response));
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 2000,
        theme: theme === "dark" ? "dark" : "light",
      });
    }
  };
  const quotes = [
    "Success is not final, failure is not fatal...",
    "The only limit to our realization of tomorrow...",
    "Opportunities don't happen, you create them...",
    "Hardships prepare ordinary people for destiny...",
  ];

  useEffect(() => {
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    let i = 0;
    setTypedQuote("");
    const interval = setInterval(() => {
      if (i < quote.length) {
        setTypedQuote((prev) => prev + quote[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isLogin]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-5 transition-all duration-500 ${
        theme === "dark" ? "bg-[#1A1A2E] text-white" : "bg-[#EFE9D5] text-black"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-[90vw] lg:max-w-[80vw] h-auto lg:h-[85vh] flex flex-col lg:flex-row rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Left Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.6 } }}
          className="w-full lg:w-1/3 bg-gradient-to-b from-[#27445D] to-[#497D74] text-white p-10 flex flex-col justify-center items-center text-center lg:text-left"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            className="text-2xl lg:text-3xl font-bold"
          >
            {isLogin ? "Welcome Back!" : "Join Us Today!"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1 } }}
            className="mt-3 italic opacity-90"
          >
            {typedQuote}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsLogin(!isLogin)}
            className="mt-5 underline"
          >
            {isLogin ? "Create an account" : "Already have an account?"}
          </motion.button>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="w-full lg:w-2/3 p-6 lg:p-10 flex flex-col items-center justify-center"
          style={{ backgroundColor: theme === "dark" ? "#222831" : "#FFFFFF" }}
        >
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.7 } }}
            className="text-2xl lg:text-3xl font-bold text-center mb-6"
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.h2>

          {/* Profile Upload (Signup Only) */}
          {!isLogin && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.9 } }}
              className="flex justify-center mb-5"
            >
              <label className="relative cursor-pointer">
                <input type="file" className="hidden" />
                <img
                  src={profileImage || "https://via.placeholder.com/80"}
                  alt="Profile"
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-gray-400"
                />
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 text-xs">
                  +
                </div>
              </label>
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 1.2 },
              },
            }}
            onSubmit={handleSubmit}
            className="space-y-4 w-full max-w-sm"
          >
            {!isLogin && (
              <>
                <motion.input
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded border bg-transparent focus:outline-none"
                />
                <motion.input
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded border bg-transparent focus:outline-none"
                />
                <motion.input
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  type="text"
                  name="schoolName"
                  placeholder="School Name"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="w-full p-3 rounded border bg-transparent focus:outline-none"
                />
              </>
            )}

            <motion.input
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded border bg-transparent focus:outline-none"
            />

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="relative"
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded border bg-transparent focus:outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="w-full p-3 rounded text-white font-bold bg-[#497D74]"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>

      <ToastContainer />
    </div>
  );
};

export default Auth;
