export const authService = {
  login: (email, password) => {
    if (email === "admin@example.com" && password === "admin123") {
      return { email, role: "admin" };
    }
    if (email === "employee@example.com" && password === "emp123") {
      return { email, role: "employee" };
    }
    return null;
  },
};
