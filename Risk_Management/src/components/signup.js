import axios from "axios";

const signup = async (userData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/signup", userData, {
      withCredentials: true, // important for cookie-based auth
    });
    console.log(response.data); // you can store user info in state or context
  } catch (err) {
    console.error(err.response?.data?.message || "Signup failed");
  }
};
