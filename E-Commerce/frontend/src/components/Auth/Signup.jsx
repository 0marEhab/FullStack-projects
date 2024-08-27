import { Form, useActionData } from "react-router-dom";
import { useState } from "react";
import imageTobase64 from "../../helper/profile-Image";

import loginIcons from "../../assests/signin.gif";
import Input from "../UI/Input";

export default function Signup() {
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setProfPic(imagePic);
  };

  const errorsObj = {};
  const data = useActionData();
  console.log(data);

  if (data && Array.isArray(data.message)) {
    data.message.forEach((err) => {
      errorsObj[err.path] = err.msg;
    });
  }

  const [profPic, setProfPic] = useState("");
  return (
    <section className="container mx-auto my-20 px-4">
      <div className="flex justify-center flex-col items-center p-2 w-full max-w-md mx-auto">
        <Form method="post" encType="multipart/form-data">
          <div
            className="mx-auto relative overflow-hidden rounded-full"
            style={{ width: "7.5rem", height: "7.5rem" }}
          >
            <div>
              <img
                src={profPic || loginIcons}
                alt="login icons"
                className="object-cover w-full h-full"
              />
            </div>

            <label>
              <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                Upload Photo
              </div>
              <input
                type="file"
                name="profilePic"
                className="hidden"
                onChange={handleUploadPic}
              />
            </label>
          </div>

          <div className="flex flex-col">
            <Input
              error={errorsObj.name}
              type={"text"}
              value={"name"}
              id="name"
            />
            <Input
              error={errorsObj.email}
              type={"email"}
              value={"email"}
              id="email"
            />
            <Input
              error={errorsObj.mobile}
              type={"text"}
              value={"mobile"}
              id="number"
            />
            <Input
              error={errorsObj.password}
              type={"password"}
              value={"password"}
              id="password"
            />
            <Input
              error={errorsObj.confirmPassword}
              type={"password"}
              value={"confirmPassword"}
              id="confirm-password"
            />
            <button className="w-[250px] px-2 py-2 md:w-[450px] my-5 rounded-full text-white bg-red-600 hover:bg-red-900">
              Create
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
}
