import { json, redirect } from "react-router-dom";
import Signup from "../components/Auth/Signup";
import summaryApi from "../common/index";
import { toast } from "react-toastify";

export default function AuthSignup() {
  return <Signup />;
}

export async function action({ request }) {
  const data = await request.formData();
  const formData = new FormData();
  formData.append("name", data.get("name"));
  formData.append("mobile", data.get("mobile"));
  formData.append("email", data.get("email"));
  formData.append("password", data.get("password"));
  formData.append("confirmPassword", data.get("confirmPassword"));
  formData.append("profilePic", data.get("profilePic"));

  const response = await fetch(summaryApi.signup.url, {
    method: "POST",
    body: formData,
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    return json({ message: "Could not signup" }, { status: 500 });
  }

  const resData = await response.json();
  toast.success(resData.message);

  return redirect("/login");
}
