import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Clock, Navigation } from "lucide-react";
import Layout from "@/components/Layout";

interface HealthcareLocation {
  id: number;
  name: string;
  type: "pharmacy" | "doctor" | "hospital";
  address: string;
  phone: string;
  distance: string;
  status: "open" | "closed" | "24h";
  rating?: number;
}

const NearbyHelp = () => {
  const [selectedType, setSelectedType] = useState<string>("all");

  const locations: HealthcareLocation[] = [
    {
      id: 1,
      name: "MedPlus Pharmacy",
      type: "pharmacy",
      address: "123 Main Street, Downtown",
      phone: "+1 234-567-8901",
      distance: "0.3 km",
      status: "open",
      rating: 4.5
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      type: "doctor",
      address: "456 Health Avenue, Medical District",
      phone: "+1 234-567-8902",
      distance: "0.7 km",
      status: "open",
      rating: 4.8
    },
    {
      id: 3,
      name: "City General Hospital",
      type: "hospital",
      address: "789 Emergency Blvd, Hospital Zone",
      phone: "+1 234-567-8903",
      distance: "1.2 km",
      status: "24h",
      rating: 4.6
    },
    {
      id: 4,
      name: "QuickCare Clinic",
      type: "doctor",
      address: "321 Wellness Street, Health Plaza",
      phone: "+1 234-567-8904",
      distance: "0.9 km",
      status: "open",
      rating: 4.3
    },
    {
      id: 5,
      name: "24/7 Pharmacy Plus",
      type: "pharmacy",
      address: "654 Night Avenue, Central Plaza",
      phone: "+1 234-567-8905",
      distance: "1.1 km",
      status: "24h",
      rating: 4.4
    }
  ];

  const filterTypes = [
    { value: "all", label: "All", emoji: "🏥" },
    { value: "pharmacy", label: "Pharmacy", emoji: "💊" },
    { value: "doctor", label: "Doctor", emoji: "👨‍⚕️" },
    { value: "hospital", label: "Hospital", emoji: "🏥" },
  ];

  const filteredLocations = selectedType === "all" 
    ? locations 
    : locations.filter(loc => loc.type === selectedType);

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case "pharmacy": return "💊";
      case "doctor": return "👨‍⚕️";
      case "hospital": return "🏥";
      default: return "📍";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-secondary text-secondary-foreground";
      case "24h": return "bg-primary text-primary-foreground";
      case "closed": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-foreground mb-2">Nearby Healthcare</h1>
          <p className="text-sm text-muted-foreground">Find help around you</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterTypes.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedType === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(filter.value)}
              className="whitespace-nowrap"
            >
              {filter.emoji} {filter.label}
            </Button>
          ))}
        </div>

        {/* Map Section */}
        <Card className="h-48 shadow-card">
          <CardContent className="p-0 h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Locations List */}
        <div className="space-y-3">
          {filteredLocations.map((location) => (
            <Card key={location.id} className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeEmoji(location.type)}</span>
                    <div>
                      <CardTitle className="text-base">{location.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(location.status)} variant="secondary">
                          {location.status === "24h" ? "24/7" : location.status}
                        </Badge>
                        {location.rating && (
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-xs text-muted-foreground">{location.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {location.distance}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {location.address}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-primary shadow-button"
                      onClick={() => window.open(`tel:${location.phone}`, '_self')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://maps.google.com/search/${encodeURIComponent(location.address)}`, '_blank')}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Navigate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Button */}
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-4">
            <Button 
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              onClick={() => window.open('tel:911', '_self')}
            >
              🚨 Emergency Call 911
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NearbyHelp;