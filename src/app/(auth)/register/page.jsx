"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Input,
  Label,
  Radio,
  RadioGroup,
  Separator,
  Spinner,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast } from "sonner";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [roleValue, setRoleValue] = useState("Job Seeker");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());
      console.log(user);

      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image,
        role: user.role,
      });
      if (error) {
        // Use toast.error for actual validation failures
        toast.error(error.message || "Registration failed", {
          description: "Please use a different email address and try again.",
          duration: 5000,
          className:
            "bg-[#121214] border border-zinc-800 text-white  rounded-xl shadow-2xl",
        });
        return; // Halt execution early
      }

      if (data) {
        toast.success("Account created successfully!");
        router.push("/"); // Clean client-side programmatic navigation
      }
    } catch (err) {
      // Catch unexpected runtime crashes (network drops, etc)
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Auth submit crash:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center bg-default-50/50 min-h-screen py-12">
      <div className="w-full max-w-135 bg-background rounded-sm p-8 md:p-12 border border-zinc-800/20">
        <p className="text-xl font-bold tracking-tight flex items-center mb-4">
          <span className="text-cyan-400">Nex</span>
          <span className="text-gray-400 font-extrabold">Role</span>
        </p>
        <div className="text-left mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
            Create Account
          </h1>
          <p className="text-foreground-400 text-base">
            Join NexRole to explore jobs or recruit talent
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {/* Name Input Field */}
            <TextField isRequired name="name" type="text">
              <Label>Full Name</Label>
              <Input placeholder="Enter Your Name" />
              <FieldError />
            </TextField>

            {/* Email Input Field */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>
            {/* image url  */}
            <TextField name="image" type="url">
              <Label>Profile Image URL (Optional)</Label>
              <Input
                placeholder="https://example.com/avatar.jpg"
                disabled={isLoading}
              />
              <FieldError />
            </TextField>
            <div className="flex flex-col gap-4">
              <RadioGroup name="role" value={roleValue} onChange={setRoleValue}>
                <Label>Select your Role:</Label>
                <Radio value="Job Seeker">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content>
                    <Label>Job Seeker</Label>
                    <Description>Find Jobs you in your category!</Description>
                  </Radio.Content>
                </Radio>
                <Radio value="Recruiter">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content>
                    <Label>Recruiter</Label>
                    <Description>Hire People For your Company</Description>
                  </Radio.Content>
                </Radio>
              </RadioGroup>
              <p className="text-sm text-muted">
                Selected Role: <span className="font-medium">{roleValue}</span>
              </p>
            </div>
            {/* password  */}
            <TextField
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={(value) => setPasswordValue(value)}
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <div className="relative flex items-center">
                <Input
                  placeholder="Enter your password"
                  className="w-full"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-xl text-foreground-400 hover:text-foreground transition-colors z-10 cursor-pointer"
                >
                  {showPassword ? <HiEye /> : <HiEyeOff />}
                </button>
              </div>
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>
            {/* confirm pass  */}
            <TextField
              isRequired
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPasswordValue} // controlled value
              onChange={setConfirmPasswordValue} // update state on every keystroke
              validate={(value) => {
                if (!value) return null; // skip empty — isRequired handles that
                if (value !== passwordValue) return "Passwords do not match";
                return null;
              }}
              validationBehavior="aria" // key: switches from onBlur → onChange
            >
              <Label>Confirm Password</Label>
              <div className="relative flex items-center">
                <Input
                  placeholder="Re-enter your password"
                  className="w-full"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 text-xl text-foreground-400 hover:text-foreground transition-colors z-10 cursor-pointer"
                >
                  {showConfirmPassword ? <HiEye /> : <HiEyeOff />}
                </button>
              </div>
              <FieldError />
            </TextField>
          </div>

          <Button
            type="submit"
            radius="full"
            variant="secondary"
            size="sm"
            className="w-full h-12 font-semibold text-base transition-transform active:scale-[0.98] mt-2"
            disabled={isLoading}
          >
            {isLoading ? <Spinner color="accent" /> : "Sign Up"}
          </Button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <Separator className="flex-1" />
          <p className="text-sm text-gray-500">OR</p>
          <Separator className="flex-1" />
        </div>

        {/* Google OAuth Button */}
        <Button
          disabled={isLoading}
          type="button"
          radius="full"
          size="sm"
          variant="outline"
          className="w-full h-12 transition-transform active:scale-[0.98]"
        >
          <FcGoogle className="text-lg" /> Continue with Google
        </Button>

        <p className="text-xs text-foreground-400 text-center mt-4 leading-relaxed">
          We acknowledge that you understand and accept our{" "}
          <Link
            href="/privacy"
            className="text-foreground-500 underline hover:text-foreground"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms"
            className="text-foreground-500 underline hover:text-foreground"
          >
            Terms of Use
          </Link>
        </p>

        <div className="text-center mt-8">
          <p className="text-sm text-foreground-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
