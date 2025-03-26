"use client";

import { DocumentTable } from "@/components/documents-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import { useState } from "react";
import type { Document } from "@/components/documents-table";

// Mock data generator
const generateMockDocuments = (): Document[] => [
  {
    id: "1",
    name: "Land Deed Certificate.pdf",
    uploadDate: "2024-03-15",
    status: "Verified",
    downloadUrl: "#"
  },
  {
    id: "2",
    name: "Property Tax Receipt.jpg",
    uploadDate: "2024-02-28",
    status: "Pending",
    downloadUrl: "#"
  },
  {
    id: "3",
    name: "Identity Proof.pdf",
    uploadDate: "2024-03-01",
    status: "Expired",
    downloadUrl: "#"
  },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(generateMockDocuments());
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = () => {
    // Mock upload functionality
    const newDoc: Document = {
      id: Date.now().toString(),
      name: `New Document ${documents.length + 1}.pdf`,
      uploadDate: new Date().toISOString().split('T')[0],
      status: "Pending",
      downloadUrl: "#"
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading documents...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Documents</h1>
        <Button onClick={handleUpload}>
          <FilePlus className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {documents.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No documents found. Upload your first document!
        </div>
      ) : (
        <Card className="p-6">
          <DocumentTable documents={documents} />
        </Card>
      )}
    </div>
  );
}