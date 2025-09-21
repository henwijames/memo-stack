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
import { registerUser } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email is required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      await registerUser(form);
      toast.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      setErrors({ server: error.message || "Registration failed" });
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Register an account</CardTitle>
                <CardDescription>
                  Enter your name, email and password below to register to your
                  account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                    <div className="flex flex-col gap-3">
                      <Button type="submit" className="w-full">
                        {loading ? "Registering..." : "Register"}
                      </Button>
                    </div>
                  </div>
                  {errors.server && (
                    <p className="mt-4 text-sm text-red-600">{errors.server}</p>
                  )}
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      to={"/login"}
                      className="underline underline-offset-4"
                    >
                      Login
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

export default RegisterPage;
