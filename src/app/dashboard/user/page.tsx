"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import  MapComponent  from "@/components/map";
import {ShieldCheck , Landmark , FileText} from "lucide-react"

Chart.register(...registerables);

type UserData = {
  ekycStatus: "approved" | "pending" | "rejected";
  totalProperties: number;
  totalDocuments: number;
  properties: any[];
  chartData: any;
};

export default function UserDashboard() {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user/dashboard');
        const jsonData = await response.json();
        setData(jsonData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* EKYC Banner */}
      {data?.ekycStatus === "pending" && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex justify-between items-center">
            <span>Complete your e-KYC verification</span>
            <Button size="sm">Verify Now</Button>
          </div>
        </Card>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">e-KYC Status</p>
              <Badge variant={
                data?.ekycStatus === "approved" ? "default" :
                data?.ekycStatus === "pending" ? "secondary" : "destructive"
              }>
                {data?.ekycStatus}
              </Badge>
            </div>
            <ShieldCheck className="h-6 w-6 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <h3 className="text-2xl font-bold">{data?.totalProperties}</h3>
            </div>
            <Landmark className="h-6 w-6 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Documents</p>
              <h3 className="text-2xl font-bold">{data?.totalDocuments}</h3>
            </div>
            <FileText className="h-6 w-6 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Map Preview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Properties Map</h3>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapComponent properties={data?.properties} />
        </div>
      </Card>
    </div>
  );
}