/** @format */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MapPin, Link, Navigation, CheckCircle, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Advertise = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [googleMapsLink, setGoogleMapsLink] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = () => {
    // Simulate update action
    setIsUpdated(true);
    toast.success("Location Changed");
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="mb-6">
        <ArrowLeft className="mb-5" onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-bold tracking-tight">
          Advertise Your Gym
        </h1>
        <p className="text-muted-foreground mt-2">
          Share your location to make it available on our B2C app
        </p>
      </div>

      <Card className="border-none shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Gym Location Settings
              </CardTitle>
              <CardDescription>
                Enable location sharing to appear in our mobile app directory
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
              <span className="text-sm font-medium">
                {isEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {isEnabled ? (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="maps-link"
                    className="text-base flex items-center gap-2"
                  >
                    <Link className="h-4 w-4" />
                    Google Maps link
                  </Label>
                  <Badge variant="secondary" className="ml-2">
                    OR
                  </Badge>
                </div>
                <Input
                  id="maps-link"
                  placeholder="https://maps.google.com/?q=Your+Gym+Name"
                  value={googleMapsLink}
                  onChange={(e) => setGoogleMapsLink(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude" className="text-base">
                    Latitude
                  </Label>
                  <Input
                    id="latitude"
                    placeholder="40.7128"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude" className="text-base">
                    Longitude
                  </Label>
                  <Input
                    id="longitude"
                    placeholder="-74.0060"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleGetCurrentLocation}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  Use Current Location
                </Button>

                <Button
                  onClick={handleUpdate}
                  disabled={!googleMapsLink && (!latitude || !longitude)}
                  className="flex items-center gap-2 flex-1"
                >
                  {isUpdated ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Updated Successfully
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>

              {!googleMapsLink && (!latitude || !longitude) && (
                <p className="text-sm text-muted-foreground text-center">
                  Please provide either a Google Maps link or both latitude and
                  longitude coordinates
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-3">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">
                Enable location sharing to start advertising your gym on our B2C
                app
              </p>
              <p className="text-sm text-muted-foreground">
                Your gym will appear in our mobile app directory when location
                sharing is enabled
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Advertise;
