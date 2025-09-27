/** @format */

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigate();
  const carouselItems = [
    {
      title: "More Members, More Revenue.",
      description:
        "Streamline your membership management and boost your gym's profitability with our comprehensive tools.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
      alt: "Happy gym members working out",
    },
    {
      title: "Smarter Gym Management.",
      description:
        "Automate scheduling, payments, and member communications to focus on what you do best.",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&crop=center",
      alt: "Gym management dashboard",
    },
    {
      title: "Welcome to Wellvantage",
      description:
        "Join thousands of successful gym owners who trust our platform to grow their business.",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop&crop=center",
      alt: "Successful gym owner",
    },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const handleCreateAccount = () => {
    // Handle create account navigation
    navigation("/auth/register");
  };

  const handleLogin = () => {
    // Handle login navigation
    navigation("/auth/login");
    console.log("Login clicked");
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Image Carousel */}
      <div className="w-1/2 h-screen relative overflow-hidden bg-black">
        <Carousel
          className="w-full h-full"
          setApi={(api) => {
            if (api) {
              api.scrollTo(currentIndex);
            }
          }}
        >
          <CarouselContent className="h-full">
            {carouselItems.map((item, index) => (
              <CarouselItem key={index} className="h-screen">
                <div className="relative w-full h-full">
                  {/* Full screen height image */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />

                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex items-end p-12">
                    <div className="text-white max-w-md">
                      <h2 className="text-4xl font-bold mb-4 leading-tight">
                        {item.title}
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Indicator dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Auth Section (Updated to match Login page style) */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Get Started
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Join thousands of gym owners growing their business
                  </p>
                </div>

                {/* Main Action Buttons */}
                <div className="space-y-5">
                  <Button
                    onClick={handleCreateAccount}
                    className="w-full py-3 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-200"
                    size="lg"
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

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

                  {/* Google Signup */}
                  <Button
                    variant="outline"
                    className="w-full py-3 text-base font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200"
                    size="lg"
                  >
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
                  </Button>
                </div>

                {/* Footer */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto font-semibold text-emerald-600 hover:text-emerald-700 text-sm"
                      onClick={handleLogin}
                    >
                      Log in here
                    </Button>
                  </p>
                </div>

                <div className="text-xs text-gray-400 text-center pt-1 border-t border-gray-100">
                  By signing up, you agree to our{" "}
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

export default Onboarding;
