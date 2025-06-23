
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/google", {
        token: credentialResponse.credential,
      }, { withCredentials: true });

      console.log("Login Success", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.open("http://localhost:3000/auth/google", "_self");

      //window.location.href = "/"; // ya navigate("/")
    } catch (err) {
      console.error("Login Failed", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleLoginButton;
