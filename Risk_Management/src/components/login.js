const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/api/login", {
      email,
      password,
    }, {
      withCredentials: true,
    });

    console.log("User Logged In:", response.data);
  } catch (err) {
    console.error("Login failed:", err.response?.data?.message);
  }
};
