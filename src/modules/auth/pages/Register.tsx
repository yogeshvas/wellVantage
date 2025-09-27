/** @format */

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  User,
  Building,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gymName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVerifyPhone = async () => {
    if (!formData.phone.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsVerifyingPhone(true);
    const loadingToast = toast.loading("Verifying phone number...");

    // Simulate phone verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsVerifyingPhone(false);
    toast.dismiss(loadingToast);

    // For demo purposes, assume verification succeeds
    setIsPhoneVerified(true);
    toast.success("Phone number verified successfully!", {
      duration: 4000,
      icon: "✅",
    });
  };

  const handleSendOTP = async () => {
    if (!formData.email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Sending OTP...");

    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast.dismiss(loadingToast);
    setShowOTP(true);
    toast.success("OTP sent successfully!", {
      duration: 4000,
      icon: "✅",
    });
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

    // Hardcoded validation for demo
    if (formData.email === "admin@wellvantage.com" && otp === "123456") {
      toast.dismiss(loadingToast);
      toast.success(`Registration successful for ${formData.email}!`, {
        duration: 4000,
        icon: "✅",
      });
      // Navigate to login or dashboard
      navigate("/auth/login");
    } else {
      toast.dismiss(loadingToast);
      toast.error("Invalid OTP. Please try again.", {
        duration: 4000,
      });
    }

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

  const handleNextStep = () => {
    if (currentStep === 1 && !isStep1Valid) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (currentStep === 2 && !isStep2Valid) {
      toast.error("Please verify your phone number");
      return;
    }
    if (currentStep === 3 && !isStep3Valid) {
      toast.error("Please fill in all required address fields");
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSendOTP();
    }
  };

  const handleBackStep = () => {
    if (showOTP) {
      setShowOTP(false);
      setOtp("");
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step validation checks
  const isStep1Valid =
    formData.gymName.trim() &&
    formData.firstName.trim() &&
    formData.lastName.trim();

  const isStep2Valid =
    formData.email.trim() && formData.phone.trim() && isPhoneVerified;

  const isStep3Valid =
    formData.address1.trim() &&
    formData.city.trim() &&
    formData.state.trim() &&
    formData.country.trim();

  const steps = [
    { number: 1, title: "Gym Information", description: "Basic gym details" },
    {
      number: 2,
      title: "Contact Details",
      description: "Email and phone verification",
    },
    {
      number: 3,
      title: "Business Address",
      description: "Location information",
    },
    { number: 4, title: "Verification", description: "Email confirmation" },
  ];

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Logo Section */}
      <div className="w-1/2 bg-gradient-to-br from-emerald-700 via-green-500 to-emerald-700 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Logo and Brand */}
        <div className="relative z-10 text-center">
          {/* Logo Container */}
          <div className="mb-8 flex justify-center">
            <div className="text-white">
              <img
                src="/images/logo.png"
                className="h-32 w-32"
                alt="Wellvantage Logo"
              />
            </div>
          </div>

          {/* Brand Text */}
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Wellvantage
          </h1>
          <p className="text-xl text-white/90 font-medium mb-2">
            Smarter Gym Management
          </p>
          <p className="text-white/80 text-lg max-w-md mx-auto leading-relaxed">
            Join thousands of gym owners who trust Wellvantage to streamline
            their operations and grow their business.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-8 text-white/20">
          <div className="flex space-x-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentStep >= step.number || (showOTP && step.number === 4)
                    ? "bg-white"
                    : "bg-current"
                }`}
              ></div>
            ))}
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

      {/* Right Side - Registration Form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="space-y-6">
                {/* Step Progress */}
                {!showOTP && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-emerald-600">
                        Step {currentStep} of 3
                      </span>
                      <span className="text-sm text-gray-500">
                        {steps[currentStep - 1]?.title}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / 3) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {steps[currentStep - 1]?.description}
                    </p>
                  </div>
                )}

                {/* Header */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {showOTP
                      ? "Verify Email"
                      : `Step ${currentStep}: ${steps[currentStep - 1]?.title}`}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {showOTP
                      ? `Enter the 6-digit code sent to ${formData.email}`
                      : steps[currentStep - 1]?.description}
                  </p>
                </div>

                {showOTP ? (
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
                      {formData.email === "admin@wellvantage.com" && (
                        <p className="text-xs text-gray-500 text-center mt-2">
                          Demo: Use <strong>123456</strong> for
                          admin@wellvantage.com
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        className="flex-1 py-3 text-base font-semibold border-2 rounded-xl"
                        onClick={handleBackStep}
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
                            Creating...
                          </>
                        ) : (
                          "Create Account"
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

                    {formData.email === "admin@wellvantage.com" && (
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
                ) : currentStep === 1 ? (
                  /* Step 1 - Gym Information */
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="gymName"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Gym Name *
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="gymName"
                          type="text"
                          placeholder="Your Gym Name"
                          className="pl-12 py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                          value={formData.gymName}
                          onChange={(e) =>
                            handleInputChange("gymName", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-semibold text-gray-700"
                        >
                          First Name *
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            className="pl-12 py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          className="py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleNextStep}
                      className="w-full py-3 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-200"
                      size="lg"
                      disabled={!isStep1Valid}
                    >
                      Continue to Contact Details
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                ) : currentStep === 2 ? (
                  /* Step 2 - Contact Details */
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Email Address *
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
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Phone Number *
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="pl-12 py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl pr-32"
                          value={formData.phone}
                          onChange={(e) => {
                            handleInputChange("phone", e.target.value);
                            setIsPhoneVerified(false);
                          }}
                          disabled={isPhoneVerified}
                        />
                        <div className="absolute inset-y-0 right-0 pr-1 flex items-center">
                          {isPhoneVerified ? (
                            <div className="flex items-center bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verified
                            </div>
                          ) : (
                            <Button
                              onClick={handleVerifyPhone}
                              disabled={
                                !formData.phone.trim() || isVerifyingPhone
                              }
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-medium rounded-lg"
                            >
                              {isVerifyingPhone ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              ) : (
                                "Verify"
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1 py-3 text-base font-semibold border-2 rounded-xl"
                        onClick={handleBackStep}
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                      <Button
                        onClick={handleNextStep}
                        className="flex-1 py-3 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                        disabled={!isStep2Valid}
                      >
                        Continue to Address
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Step 3 - Address Information */
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="address1"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Address Line 1 *
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="address1"
                          type="text"
                          placeholder="Street address"
                          className="pl-12 py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                          value={formData.address1}
                          onChange={(e) =>
                            handleInputChange("address1", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="address2"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Address Line 2
                      </Label>
                      <Input
                        id="address2"
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        className="py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                        value={formData.address2}
                        onChange={(e) =>
                          handleInputChange("address2", e.target.value)
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label
                          htmlFor="city"
                          className="text-sm font-semibold text-gray-700"
                        >
                          City *
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="City"
                          className="py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="state"
                          className="text-sm font-semibold text-gray-700"
                        >
                          State *
                        </Label>
                        <Input
                          id="state"
                          type="text"
                          placeholder="State"
                          className="py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                          value={formData.state}
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label
                          htmlFor="country"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Country *
                        </Label>
                        <Input
                          id="country"
                          type="text"
                          placeholder="Country"
                          className="py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                          value={formData.country}
                          onChange={(e) =>
                            handleInputChange("country", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="zipCode"
                          className="text-sm font-semibold text-gray-700"
                        >
                          ZIP Code
                        </Label>
                        <Input
                          id="zipCode"
                          type="text"
                          placeholder="12345"
                          className="py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                          value={formData.zipCode}
                          onChange={(e) =>
                            handleInputChange("zipCode", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1 py-3 text-base font-semibold border-2 rounded-xl"
                        onClick={handleBackStep}
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                      <Button
                        onClick={handleNextStep}
                        className="flex-1 py-3 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                        disabled={isLoading || !isStep3Valid}
                      >
                        {isLoading ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Verification Code
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Button
                      onClick={() => navigate("/auth/login")}
                      variant="link"
                      className="p-0 h-auto font-semibold text-emerald-600 hover:text-emerald-700 text-sm"
                    >
                      Sign in here
                    </Button>
                  </p>
                </div>

                <div className="text-xs text-gray-400 text-center pt-1 border-t border-gray-100">
                  By registering, you agree to our{" "}
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

export default Register;
