import { Form, useActionData, Link } from "react-router-dom";

import loginIcons from "/signin.gif";

import Input from "../UI/Input";

export default function Login() {
  const data = useActionData();

  return (
    <section id="login" className="container mx-auto my-20 px-4">
      <div className="flex justify-center flex-col items-center p-2 w-full max-w-md mx-auto">
        <div className="w-50 m-4 h-50 mx-auto">
          <img src={loginIcons} alt="login icons" />
        </div>

        <Form method="post">
          {data && data.message && (
            <ul>
              <li>
                <p className="text-red-600 mb-4 ">
                  {Object.values(data.message)}
                </p>
              </li>
            </ul>
          )}
          <div className="flex flex-col">
            <Input type={"email"} value={"email"} />
            <Input type={"password"} value={"password"} />

            <button className="w-[250px] px-2 py-2 md:w-[450px] my-5 rounded-full text-white bg-red-600 hover:bg-red-900">
              Login
            </button>
          </div>
        </Form>
        <div>
          <Link to="/signup">
            <button className="w-[230px] px-2 py-2 md:w-[400px] my-5 rounded-full text-white bg-red-600 hover:bg-red-900">
              Signup
            </button>
          </Link>
          <p className="mt-5 text-center">
            Forgot your password?{" "}
            <a href="#" className=" text-red-600 underline">
              Click here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
