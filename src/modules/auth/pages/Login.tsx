/** @format */

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSendOTP = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Sending OTP...");

    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast.dismiss(loadingToast);
    setShowOTP(true);
    toast.success("OTP sent successfully!");
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim() || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Verifying OTP...");

    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Hardcoded validation
    if (email === "admin@wellvantage.com" && otp === "123456") {
      login(email);
      toast.dismiss(loadingToast);
      toast.success(`Welcome back, ${email}!`, {
        duration: 4000,
        icon: "✅",
      });
      navigate("/profile");
    } else {
      toast.dismiss(loadingToast);
      toast.error("Invalid email or OTP. Please try again.", {
        duration: 4000,
      });
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const loadingToast = toast.loading("Signing in with Google...");

    // Simulate Google login
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo purposes, use a generic email for social login
    login("user@gmail.com");
    toast.dismiss(loadingToast);
    toast.success("Google login successful! Welcome back!", {
      duration: 4000,
      icon: "✅",
    });

    setIsLoading(false);
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    const loadingToast = toast.loading("Signing in with Apple...");

    // Simulate Apple login
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo purposes, use a generic email for social login
    login("user@apple.com");
    toast.dismiss(loadingToast);
    toast.success("Apple login successful! Welcome back!", {
      duration: 4000,
      icon: "✅",
    });

    setIsLoading(false);
  };

  const handleResendOTP = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: "Sending new OTP...",
      success: "A new OTP has been sent to your email!",
      error: "Failed to send OTP. Please try again.",
    });
  };

  const handleDemoHint = () => {
    toast(`Demo Credentials:\nEmail: admin@wellvantage.com\nOTP: 123456`, {
      duration: 6000,
      icon: "ℹ️",
    });
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Logo Section */}
      <div className="w-1/2 bg-gradient-to-br from-emerald-700 via-green-500 to-emerald-700 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Logo and Brand */}
        <div className="relative z-10 text-center">
          <div className="mb-8 flex justify-center">
            <div className="text-white">
              <img
                src="/images/logo.png"
                className="h-32 w-32"
                alt="Wellvantage Logo"
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Wellvantage
          </h1>
          <p className="text-xl text-white/90 font-medium mb-2">
            Smarter Gym Management
          </p>
          <p className="text-white/80 text-lg max-w-md mx-auto leading-relaxed">
            Streamline operations, enhance member experience, and grow your
            fitness business.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-8 left-8 text-white/20">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-current rounded-full"></div>
            <div className="w-2 h-2 bg-current rounded-full"></div>
            <div className="w-2 h-2 bg-current rounded-full"></div>
          </div>
        </div>

        {/* Demo Hint Button */}
        <button
          onClick={handleDemoHint}
          className="absolute bottom-8 right-8 bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-full transition-colors duration-200"
        >
          Demo Credentials
        </button>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {showOTP ? "Verify OTP" : "Welcome Back"}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {showOTP
                      ? `Enter the 6-digit code sent to ${email}`
                      : "Sign in to your account"}
                  </p>
                </div>

                {!showOTP ? (
                  /* Email Input */
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-12 py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSendOTP();
                            }
                          }}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleSendOTP}
                      className="w-full py-3 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-200"
                      size="lg"
                      disabled={isLoading || !email.trim()}
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          Send OTP
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {/* Demo Hint */}
                    {email === "admin@wellvantage.com" && (
                      <div className="text-center">
                        <button
                          onClick={handleDemoHint}
                          className="text-xs text-emerald-600 hover:text-emerald-700 underline"
                        >
                          Click for demo OTP
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* OTP Verification */
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="otp"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Verification Code
                      </Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="000000"
                        className="py-3  text-center text-2xl font-mono tracking-widest border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                        maxLength={6}
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleVerifyOTP();
                          }
                        }}
                      />
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Demo: Use <strong>123456</strong> for
                        admin@wellvantage.com
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        className="flex-1 py-3 text-base font-semibold border-2 rounded-xl"
                        onClick={() => {
                          setShowOTP(false);
                          setOtp("");
                        }}
                        disabled={isLoading}
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                      <Button
                        onClick={handleVerifyOTP}
                        className="flex-1 py-3 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                        disabled={isLoading || otp.length !== 6}
                      >
                        {isLoading ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                            Verifying...
                          </>
                        ) : (
                          "Verify & Login"
                        )}
                      </Button>
                    </div>

                    <div className="text-center">
                      <Button
                        variant="link"
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                        onClick={handleResendOTP}
                        disabled={isLoading}
                      >
                        Didn't receive code? Resend
                      </Button>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500 font-medium">
                      OR
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                  {/* Google Login */}
                  <Button
                    onClick={handleGoogleLogin}
                    variant="outline"
                    className="w-full py-3 text-base font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-3" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Continue with Google
                      </>
                    )}
                  </Button>

                  {/* Apple Login */}
                  <Button
                    onClick={handleAppleLogin}
                    variant="outline"
                    className="w-full py-3 text-base font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-3" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-3"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        Continue with Apple
                      </>
                    )}
                  </Button>
                </div>

                {/* Footer */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto font-semibold text-emerald-600 hover:text-emerald-700 text-sm"
                    >
                      Sign up here
                    </Button>
                  </p>
                </div>

                <div className="text-xs text-gray-400 text-center pt-1 border-t border-gray-100">
                  By signing in, you agree to our{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs underline text-gray-400"
                  >
                    Terms
                  </Button>{" "}
                  and{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs underline text-gray-400"
                  >
                    Privacy Policy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
