import React, { useState } from "react";
import lib from "../lib/lib";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import auth from "../../Database/FIrebase.config";
import { FadeLoader } from "react-spinners";
import regestation from "../assets/Regestation.png";
import { Link } from "react-router";
import { getDatabase, push, ref, set } from "firebase/database";

const Singup = () => {
  let db = getDatabase();
  let data = lib.singUpData();
  let { successtost, errortost, infotost } = lib;

  // ----------normal state----------

  let [email, setemail] = useState("");
  let [fullname, setfullname] = useState("");
  let [password, setpassword] = useState("");
  let [eye, seteye] = useState(false);
  let [loder, setloder] = useState(false);

  //------error state------------

  let [emailError, setemailError] = useState("");
  let [fullnameError, setfullnameError] = useState("");
  let [passwordError, setpasswordError] = useState("");

  // onchange listiner---------

  let handlechange = (event) => {
    let { name, value } = event.target;
    if (name == "email") {
      setemail(value);
    } else if (name == "fullname") {
      setfullname(value);
    } else {
      setpassword(value);
    }
  };

  // handlesingup function
  /*
    todo handlelogin function implement
    params: ({})
    return: void
  */

  let handlesingup = () => {
    if (!email) {
      setemailError("Missing Email");
    } else if (!fullname) {
      setfullnameError("Missing Fullname");
    } else if (!password) {
      setpasswordError("Missing Password");
    } else {
      setloder(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          successtost("🦄 Registation successfull!");
          updateProfile(auth.currentUser, {
            displayName: fullname,
            photoURL:
              "https://images.pexels.com/photos/20566244/pexels-photo-20566244/free-photo-of-portrait-of-a-beautiful-blonde-peeking-from-behind-a-wall.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          })
            .then(() => {
              let userdb = ref(db, "users/")
              set(push(userdb), {
                userid: auth.currentUser.uid,
                username: auth.currentUser.displayName || name,
                email: auth.currentUser.email || email,
                profile_picture:
                  auth.currentUser.photoURL ||
                  `https://images.pexels.com/photos/20566244/pexels-photo-20566244/free-photo-of-portrait-of-a-beautiful-blonde-peeking-from-behind-a-wall.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`,
              });
              return sendEmailVerification(auth.currentUser);
            })
            .then(() => {
              infotost("🦄 Email send successfull check your email!");
              setloder(false);
            });
        })
        .catch((err) => {
          errortost(err.code);
        })
        .finally(() => {
          setloder(false);
        });
    }
  };

  // --------React loader----------

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  // ------------------------------

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 h-screen flex flex-col justify-center items-center">
          <h1 className=" font-nonitw font-bold text-[34px] text-[#11175D] ">
            Get started with easily register
          </h1>
          <p className="font-nonitw font-normal text-[20px] text-[#000000]">
            Free register and you can enjoy it
          </p>

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
                <label
                  className="font-nonitw font-semibold text-[15px] text-[#11175D]"
                  htmlFor="email"
                >
                  {` ${name}`}
                  {requared && <span className="text-red-600">*</span>}
                </label>
                <input
                  type={
                    name == "email"
                      ? "email"
                      : name == "fullname"
                      ? "text"
                      : name == "password" && !eye
                      ? "password"
                      : "text"
                  }
                  placeholder={` ${name}`}
                  name={name}
                  onChange={handlechange}
                  className="w-[368px] h-[70px] border border-[#11175D] px-4 py-1 outline-0 rounded font-nonitw font-semibold text-[20px] text-[#11175D]"
                />
                {icon && (
                  <span
                    onClick={() => seteye(!eye)}
                    className={
                      passwordError && password == ""
                        ? " absolute right-[5%] top-[43%] cursor-pointer text-[22px] text-[#03014C]"
                        : " absolute right-[5%] top-[59%]  cursor-pointer text-[22px] text-[#03014C]"
                    }
                  >
                    {eye ? <FaRegEye /> : <FaEyeSlash />}
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
            {loder ? (
              <button
                onClick={handlesingup}
                className="w-[368px] h-[60px] py-2 px-2 bg-[#5F35F5] rounded-3xl mt-7 text-white font-nonitw font-semibold text-[20px] cursor-pointer"
              >
                <FadeLoader
                  color={"#000000"}
                  loading={loder}
                  cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </button>
            ) : (
              <button
                onClick={handlesingup}
                className="w-[368px] h-[60px] py-2 px-2 bg-[#5F35F5] rounded-3xl mt-7 text-white font-nonitw font-semibold text-[20px] cursor-pointer"
              >
                Sing Up
              </button>
            )}
          </form>
          <p className="mt-5 font-opensence font-normal text-[13px] text-[#03014C] ">
            Already have an account ?
            <Link
              to={"/singin"}
              className="font-opensence font-bold text-[13px] text-[#EA6C00] px-1"
            >
              Sing In
            </Link>
          </p>
        </div>
        <div className=" w-1/2 h-screen">
          <picture>
            <img src={regestation} alt={regestation} />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default Singup;
