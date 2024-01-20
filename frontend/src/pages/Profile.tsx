import React from "react";
import { Button, Form, Input } from "antd";

export default function Profile() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-100 mx-2 md:mx-2">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full p-4 bg-white rounded-lg shadow-md border border-blue-200">
          <p className="text-center text-slate-700 mx-auto text-4xl font-bold drop-shadow-sm mt-8">
            Your Profile
          </p>
          hghgf
          <p className=" text-right text-sm text-slate-700">
            Not Registered ? Register Here
          </p>
        </div>
      </div>
    </div>
  );
}
