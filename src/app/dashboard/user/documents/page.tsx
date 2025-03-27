"use client";

import {DocumentTable} from "@/components/documents-table"; // Adjust the import path to your document-table.tsx

export default function DocumentPage() {
  // Sample data defined directly in the page component
  const sampleDocuments = [
    {
      id: "1",
      name: "Annual Report 2023.pdf",
      uploadDate: "2024-03-15",
      status: "valid" as const,
      fileUrl: "/documents/report2023.pdf"
    },
    {
      id: "2",
      name: "Employment Contract.docx",
      uploadDate: "2024-03-14",
      status: "tampered" as const,
      fileUrl: "/documents/contract.docx"
    },
    {
      id: "3",
      name: "Technical Specifications.pdf",
      uploadDate: "2024-03-13",
      status: "pending" as const,
      fileUrl: "/documents/specs.pdf"
    },
  ];

  const handleVerify = (documentId: string) => {
    console.log("Initiating verification for document:", documentId);
    // Add actual verification logic here
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Documents Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your verified documents</p>
      </div>
      
      <DocumentTable 
        documents={sampleDocuments} 
        onVerify={handleVerify}
      />
    </div>
  );
}