import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Stethoscope } from "lucide-react";
import Layout from "@/components/Layout";

const Home = () => {
  const [symptoms, setSymptoms] = useState("");
  const navigate = useNavigate();

  const handleCheckSymptoms = () => {
    if (symptoms.trim()) {
      navigate("/results", { state: { symptoms } });
    }
  };

  const commonSymptoms = [
    "Fever, Headache",
    "Cough, Sore throat",
    "Nausea, Stomach pain",
    "Fatigue, Body aches",
  ];

  return (
    <Layout>
      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <Card className="p-6 bg-gradient-card shadow-card text-center">
          <div className="mb-4">
            <Stethoscope className="h-12 w-12 mx-auto text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">
            How are you feeling today?
          </h2>
          <p className="text-muted-foreground">
            Describe your symptoms and get helpful guidance
          </p>
        </Card>

        {/* Symptom Input */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Type your symptoms (e.g., cough, fever, headache)"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="pl-10 h-12 text-base"
              onKeyDown={(e) => e.key === "Enter" && handleCheckSymptoms()}
            />
          </div>
          
          <Button
            onClick={handleCheckSymptoms}
            disabled={!symptoms.trim()}
            className="w-full h-12 bg-gradient-primary shadow-button hover:shadow-lg transition-all"
            size="lg"
          >
            Check Symptoms 🔍
          </Button>
        </div>

        {/* Common Symptoms */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Common Symptoms:</h3>
          <div className="grid grid-cols-1 gap-2">
            {commonSymptoms.map((symptom, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto py-3 text-left"
                onClick={() => {
                  setSymptoms(symptom);
                  navigate("/results", { state: { symptoms: symptom } });
                }}
              >
                {symptom}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-16 flex-col gap-2"
            onClick={() => navigate("/nearby-help")}
          >
            <span className="text-lg">📍</span>
            Find Help
          </Button>
          <Button
            variant="outline"
            className="h-16 flex-col gap-2"
            onClick={() => navigate("/chatbot")}
          >
            <span className="text-lg">💬</span>
            Chat Now
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;