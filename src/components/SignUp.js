import React from "react";

export default function SignUp() {
  return (
    <div className="h-screen w-screen absolute top-0 flex justify-center items-center backdrop-brightness-50">
      <div className="bg-white rounded-sm p-4">
        <div className="flex justify-end p-2 pt-3">
          <i class="fa-solid fa-x fa-xl cursor-pointer"></i>
        </div>
        <div className="flex justify-center items-center flex-col text-center">
          <img
            src="https://statics.olx.in/external/base/img/loginEntryPointPost.webp"
            className="w-20"
            alt="Banner"
          />
          <p className="text-cyan-900 font-semibold my-5">
            Help us become one of the safest places <br /> to buy and sell
          </p>
        </div>
        <div className="flex flex-col gap-3 my-5">
          <div className="relative flex-1 flex">
            <input
              disabled
              type="text"
              placeholder="Continue with Email address"
              className="cursor-pointer flex-1 w-96 pl-10 py-3 border-2 border-cyan-950 rounded-md placeholder-cyan-900 font-semibold hover:border-4"
            />
            <div className="absolute top-3 left-3">
              <i class="fa-regular fa-envelope fa-lg"></i>
            </div>
          </div>
          <div className="relative flex flex-1">
            <input
              disabled
              type="text"
              placeholder="Continue with Google"
              className="cursor-pointer flex-1 pl-10 py-3 border-2 border-cyan-950 rounded-md placeholder-cyan-900 font-semibold hover:border-4"
            />
            <div className="absolute top-3 left-3">
              <i class="fa-brands fa-google fa-lg"></i>
            </div>
          </div>
        </div>
        <div>
          <p className="uppercase text-center font-semibold text-sm">or</p>
        </div>
        <div className="my-3">
          <h6 className="underline font-semibold text-center cursor-pointer">
            Login with Email
          </h6>
        </div>
        <div className="mt-20 text-center text-xs text-gray-500">
          <div>
            <p>All your personal details are safe with us.</p>
          </div>
          <div className="mt-4">
            <p>
              if you continue, you are accepting{" "}
              <span className="text-blue-500">
                OLX Terms and <br />
                Conditions and Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
