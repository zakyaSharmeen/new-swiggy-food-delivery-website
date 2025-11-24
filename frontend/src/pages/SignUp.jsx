import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {  Link } from "react-router-dom";
import axios from "axios";

<FcGoogle />

function SignUp() {
  const primaryColor = "#ff4d2d";
  // const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const[fullName, setFullName]=useState("");
  const[email, setEmail]=useState("");
  const[mobile, setMobile]=useState("");
  const[password, setPassword]=useState("");
  const serverURL = "http://localhost:8000";


  const handleSignUp = async ()=>{
    try{
      
      const result = await axios.post(
  `${serverURL}/api/auth/signup`,
  {
    fullName,
    email,
    mobile,
    password,
    role
  },
  { withCredentials: true }
);
      console.log("Sign up successful:", result.data);

    }
    catch(error){
      console.log("Error during sign up:", error);
    }
  }
  return (
    <div>
      <div
        className="min-h-screen w-full flex items-center justify-center p-4"
        style={{ backgroundColor: bgColor }}
      >
        <div
          className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] `}
          style={{
            border: `1px solid ${borderColor}`,
          }}
        >
          <h1
            className={`text-3xl font-bold mb-2 `}
            style={{ color: primaryColor }}
          >
            Vingo
          </h1>
          <p className="text-gray-600 mb-8">
            {" "}
            Create your account to get started with delicious food deliveries
          </p>

          {/* fullName */}

          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none "
              placeholder="Enter your Full Name"
              style={{ border: `1px solid ${borderColor}` }}
              required
              onChange={(e)=> setFullName(e.target.value)}
              value={fullName}
            />
          </div>
          {/* email */}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none "
              placeholder="Enter your Email"
              style={{ border: `1px solid ${borderColor}` }}
              required
               onChange={(e)=> setEmail(e.target.value)}
              value={email}
            />
          </div>
          {/* mobile*/}

          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-medium mb-1"
            >
              Mobile
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none "
              placeholder="Enter your Mobile Number"
              style={{ border: `1px solid ${borderColor}` }}
              required
               onChange={(e)=> setMobile(e.target.value)}
              value={mobile}
            />
          </div>
          {/* password*/}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none pr-10"
                placeholder="Enter your password"
                style={{ border: `1px solid ${borderColor}` }}
                required
                 onChange={(e)=> setPassword(e.target.value)}
              value={password}
              />
              <button
                className="absolute right-3 top-2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          {/* role*/}

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-1 "
            >
              Role
            </label>
            <div className="flex gap-2 border-gray-300 ">
            {["user", "owner", "deliveryBoy"].map((r, index) =>(
              <button
              key={index}
              className="flex-1 border rounded-lg px-3 py-2 text-center front-medium transition-colors cursor-pointer"
              onClick={()=>setRole(r)}
              style={role == r?
                {backgroundColor:primaryColor, color:"white" }:
                { color: "#333"}
              }
              >{r}</button>
            ))

            }
            </div>
          </div>

         

           <button
           onClick={handleSignUp}
            className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#eb5534] cursor-pointer"
          >Sign Up
          </button>

          <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition cursor-pointer duration-200 border-gray-400 hover:bg-[#eb5534]  hover:text-white">
            <FcGoogle size={20} />

            <span>Sign up with Google</span>
          </button>
          <p className="text-center mt-6">
            Already have an account ?
           <Link to="/signin" className="text-[#ff4d2d] cursor-pointer">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
