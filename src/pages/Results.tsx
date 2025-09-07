import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";

interface Condition {
  name: string;
  probability: string;
  description: string;
  medicines: string[];
  severity: "low" | "medium" | "high";
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const symptoms = location.state?.symptoms || "";

  // Mock condition matching based on symptoms
  const getConditions = (symptoms: string): Condition[] => {
    const lower = symptoms.toLowerCase();
    const conditions: Condition[] = [];

    if (lower.includes("fever") || lower.includes("headache")) {
      conditions.push({
        name: "Common Flu",
        probability: "85%",
        description: "Viral infection affecting the respiratory system",
        medicines: ["Paracetamol", "Ibuprofen"],
        severity: "medium"
      });
    }

    if (lower.includes("cough") || lower.includes("sore throat")) {
      conditions.push({
        name: "Common Cold",
        probability: "75%",
        description: "Mild upper respiratory tract infection",
        medicines: ["Cough syrup", "Throat lozenges"],
        severity: "low"
      });
    }

    if (lower.includes("nausea") || lower.includes("stomach")) {
      conditions.push({
        name: "Gastroenteritis",
        probability: "70%",
        description: "Inflammation of the stomach and intestines",
        medicines: ["ORS", "Probiotics"],
        severity: "medium"
      });
    }

    // Default fallback
    if (conditions.length === 0) {
      conditions.push({
        name: "General Discomfort",
        probability: "60%",
        description: "Various symptoms requiring medical evaluation",
        medicines: ["Rest", "Hydration"],
        severity: "low"
      });
    }

    return conditions;
  };

  const conditions = getConditions(symptoms);
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive bg-destructive/10";
      case "medium": return "text-orange-600 bg-orange-100";
      default: return "text-secondary bg-secondary-light";
    }
  };

  return (
    <Layout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Results</h1>
            <p className="text-sm text-muted-foreground">Symptoms: {symptoms}</p>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-800">Medical Disclaimer</p>
                <p className="text-xs text-orange-700 mt-1">
                  This is for informational purposes only. Consult a healthcare professional for proper diagnosis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Possible Conditions */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Possible Conditions:</h2>
          {conditions.map((condition, index) => (
            <Card key={index} className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{condition.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {condition.probability}
                  </Badge>
                </div>
                <Badge 
                  variant="outline" 
                  className={`w-fit text-xs ${getSeverityColor(condition.severity)}`}
                >
                  {condition.severity} severity
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">
                  {condition.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Suggested medicines:</p>
                  <div className="flex flex-wrap gap-2">
                    {condition.medicines.map((medicine, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        💊 {medicine}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Button
            className="w-full h-12 bg-gradient-secondary shadow-button"
            onClick={() => navigate("/nearby-help")}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Get Nearby Help 🏥
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/chatbot")}
          >
            Ask More Questions 💬
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Results;