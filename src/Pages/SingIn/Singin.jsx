import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import singinjpj from "../../assets/Loging.jpg";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { Link, useNavigate } from "react-router";

const Singin = () => {
  let auth = getAuth();
  let db = getDatabase();
  let navigate = useNavigate();
  let [eye, seteye] = useState(false);
  let [singininfo, setsingininfo] = useState({
    email: "",
    password: "",
  });

  // onchange listiner

  let handlechange = (event) => {
    let { name, value } = event.target;
    setsingininfo({
      ...singininfo,
      [name]: value,
    });
  };

  // handlesingin function
  /*
    todo handlelogin function implement
    params: ({})
    return: void
  */

  let handlesingin = () => {
    let { email, password } = singininfo;
    signInWithEmailAndPassword(auth, email, password)
      .then((userinfo) => {
        console.log(userinfo);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handlegoogle function

  let handlegoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        let {user} = result
        let userdb = ref(db, "users/");
        set(push(userdb), {
          userid: user.uid,
          username: user.displayName || 'Name Missing',
          email: user.email || 'email Missing',
          profile_picture:
            user.photoURL ||
            `https://images.pexels.com/photos/20566244/pexels-photo-20566244/free-photo-of-portrait-of-a-beautiful-blonde-peeking-from-behind-a-wall.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`,
        }).then(()=>{
          navigate('/')
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex">
        <div className=" w-1/2 h-screen flex flex-col justify-center items-start px-48">
          <h1 className="font-bold font-opensence text-[33px] text-[#03014C] mb-[29px]">
            Login to your account!
          </h1>
          <div className=" py-2 border border-blue-600 rounded-2xl relative">
            <p
              className="font-opensence font-semibold text-[14px] text-[#03014C] px-15"
              onClick={handlegoogle}
            >
              <span className="absolute left-[13%] top-[22%] text-[20px]">
                <FcGoogle />
              </span>
              Login with Google
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={(e) => e.preventDefault()} action="#">
              <div className="flex flex-col items-start">
                <label
                  className="font-opensence font-normal text-[13px] text-[#03014C] mb-1"
                  htmlFor="email"
                >
                  Email Addres
                </label>
                <input
                  type="text"
                  name="email"
                  value={singininfo.email}
                  onChange={handlechange}
                  className="font-opensence font-semibold text-[20px] text-[#03014C]  px-3 py-1 border-b border-b-[#03014C] outline-0"
                  placeholder="Youraddres@email.com "
                />
              </div>
              <div className="flex flex-col items-start mt-[48px] relative">
                <label
                  className="font-opensence font-normal text-[13px] text-[#03014C] mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type={eye ? "text" : "password"}
                  name="password"
                  value={singininfo.password}
                  onChange={handlechange}
                  className="font-opensence font-semibold text-[20px] text-[#03014C]  px-3 py-1 border-b border-b-[#03014C] outline-0"
                  placeholder="Enter your password "
                />
                <span
                  onClick={() => seteye(!eye)}
                  className="absolute right-[0] bottom-[10px]  text-[22px] text-[#03014C]"
                >
                  {eye ? <FaRegEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button
                className="w-full h-[60px] py-2 bg-[#5F35F5] rounded-3xl mt-13 text-white font-nonitw font-semibold text-[20px] cursor-pointer"
                type="button"
                onClick={handlesingin}
              >
                Login to Continue
              </button>
            </form>
            <p className="mt-5 font-opensence font-normal text-[13px] text-[#03014C] ">
              Don’t have an account ?
              <Link
                to={"/singup"}
                className="font-opensence font-bold text-[13px] text-[#EA6C00] px-1"
              >
                Sing Up
              </Link>
            </p>
          </div>
        </div>
        <div className=" w-1/2 h-screen">
          <picture>
            <img src={singinjpj} alt={singinjpj} />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default Singin;
