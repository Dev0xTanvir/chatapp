import React, { useState } from "react";
import lib from "../lib/lib";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";


const SingUp = () => {
  let data = lib.singUpData();

  let [email, setemail] = useState("");
  let [fullname, setfullname] = useState("");
  let [password, setpassword] = useState("");
  let [eye, seteye] = useState(false);
  let [user, setUser] = useState(null)
  //------error state------------

  let [emailError, setemailError] = useState("");
  let [fullnameError, setfullnameError] = useState("");
  let [passwordError, setpasswordError] = useState("");

  let handlechange = (event) => {
    let { name, value } = event.target;
    if (name == "email") {
      setemail(value);
    } else if ((name == "fullname")) {
      setfullname(value);
    } else {
      setpassword(value);
      
    }
  };
  
  // ------------------------------

  let handlesingup = () => {
    if (!email) {
      setemailError("Missing Email");
    } else if (!fullname) {
      setfullnameError("Missing Fullname");
    } else {
      setpasswordError("Missing Password");
    } 
  }
  

  // ------------------------------

  

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-1/2 h-screen flex flex-col justify-center items-center">
          <h1>Get starded with easily register</h1>
          <p>free register and you can enjoy that</p>
          <form
            action="#"
            className="mt-7"
            onSubmit={(e) => e.preventDefault()}
          >
            {data?.map(({ name, id, requared, icon }) => (
              <div
                className="flex flex-col items-start gap-y-1 mb-3 relative"
                key={id}
              >
                <label htmlFor="email">
                  {`Enter your ${name}`}
                  {requared && <samp className="text-red-600">*</samp>}
                </label>
                <input
                  type={
                    name == "email"
                      ? "email"
                      : name == "fullname"
                      ? "text"
                      : name == "password"
                      && !eye ? 'password': 'text'
                      
                  }
                  placeholder={`write your ${name}`}
                  name={name}
                  onChange={handlechange}
                  className="border border-gray-500 px-2 py-1 outline-0"
                />
                {icon && (
                  <span
                    className=" absolute right-[5%] top-[60%] translate-[-5%, -60%] cursor-pointer"
                    
                  >
                    {eye ? <FaRegEye onClick={ ()=> seteye (!eye) } /> : <FaEyeSlash onClick={ ()=> seteye (!eye) } />}
                  </span>
                )}
                {email == "" && name == "email" ? (
                  <span className="text-red-500">{emailError}</span>
                ) : fullname == "" && name == "fullname" ? (
                  <span className="text-red-500">{fullnameError}</span>
                ) : password == "" && name == "password" ? (
                  <span className="text-red-500">{passwordError}</span>
                ) : (
                  " "
                )}
              </div>
            ))}
            <button
              onClick={handlesingup}
              className="py-2 px-2 bg-blue-700 rounded mt-3 text-white cursor-pointer"
            >
              Sing Up
            </button>
          </form>
          <p>
            Already have an account ?<samp>Sing In</samp>
          </p>
        </div>
        <div className="bg-yellow-600 w-1/2 h-screen">Two</div>
      </div>
    </div>
  );
}

export default SingUp;
