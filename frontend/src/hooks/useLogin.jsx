import axios from "axios";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("https://pinoysing-374a04dc1fef.herokuapp.com/pinoysing/login", {
        username,
        password,
      });

      if (response.status >= 200 && response.status < 300) {
        const json = response.data;

        // Save to local storage
        localStorage.setItem("PinoySingAdmin", JSON.stringify(json));
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("An error occurred during the request.");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setError("An error occurred while processing your request.");
    }
  };

  return { login, isLoading, error };
};

