import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { loginUser } from "@/lib/auth";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { LoaderCircle } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForms({ ...forms, [e.target.id]: e.target.value });
  };

  const { fetchUserProfile } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(forms);
      localStorage.setItem("token", data.token);
      await fetchUserProfile();
      toast.success("Logged in successfully");

      navigate("/");
    } catch (error) {
      console.log("Error logging in:", error);
      if (error.response.status === 401) {
        setError("Invalid email or password");
        setForms((prev) => ({ ...prev, password: "" }));
        return;
      }

      toast.error(error.response.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-3xl text-center font-bold text-primary font-mono tracking-tighter"
          >
            MemoStack
          </Motion.h1>
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        onChange={handleChange}
                      />
                      {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>

                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button type="submit" className="w-full">
                        {loading && (
                          <span className="animate-spin">
                            <LoaderCircle />
                          </span>
                        )}
                        Login
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      to={"/register"}
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
