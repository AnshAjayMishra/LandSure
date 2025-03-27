"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

export default function UploadDocument() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{
    status: "valid" | "invalid" | "error";
    message: string;
  } | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
  });

  const handleVerify = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        status: "error",
        message: "Verification failed. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Upload Document</h1>

      <Card className="p-6">
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
          >
            <input {...getInputProps()} />
            <p>Drag & drop document here, or click to select</p>
            {file && <p className="mt-2 text-sm">Selected: {file.name}</p>}
          </div>

          <Button 
            onClick={handleVerify} 
            disabled={!file}
            className="w-full"
          >
            Upload Document
          </Button>

          {result && (
            <div className={`p-4 rounded-lg ${
              result.status === "valid" 
                ? "bg-green-100 text-green-700" 
                : result.status === "invalid"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {result.message}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}