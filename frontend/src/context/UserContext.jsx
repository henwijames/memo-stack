import api from "@/lib/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      // If token expired, try to refresh
      if (error.response && error.response.status === 401) {
        console.warn("Access token expired, trying to refresh...");
        const refreshed = await tryRefreshToken();
        if (refreshed) {
          await fetchUserProfile(); // retry after refresh
          return;
        } else {
          logout();
        }
      } else {
        console.error("Error fetching user profile:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const tryRefreshToken = async () => {
    try {
      const res = await api.post(
        "/auth/refresh",
        {},
        { withCredentials: true }
      );
      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        return true;
      }
    } catch (err) {
      console.error("Refresh token failed:", err);
    }
    return false;
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, fetchUserProfile, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
