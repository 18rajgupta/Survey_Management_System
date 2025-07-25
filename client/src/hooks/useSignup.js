import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, role) => {
    setIsLoading(true);
    setError(null);
    console.log(email, password, role);
    const response = await fetch("/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the authContext
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
