const logout = async () => {
  try {
    await axios.post("http://localhost:3000/api/logout", {}, {
      withCredentials: true,
    });
    console.log("User logged out");
  } catch (err) {
    console.error(err.response?.data?.message || "Logout failed");
  }
};
