"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSave } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import Loader from "@/components/svg Icons/loader";
import { Download } from "lucide-react";

// Merchant account details interface
interface MerchantDetails {
  merchant: string;
  merchantCode: string;
  status: string;
  collectionsAccountNumber: string;
  contactName: string;
  contactEmail: string;
  webhookUrl: string;
  createdAt: string;
  approvedAt: string;
}

// Merchant fee interface
interface MerchantFee {
  id: string;
  name: string;
  description: string;
  fee: string;
  feeType: string;
  cap: string;
}

function MerchantInfo() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [loading, ] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data - replace with API calls
  const [merchantDetails, setMerchantDetails] = useState<MerchantDetails>({
    merchant: "JohnDoe Enterprises",
    merchantCode: "24085",
    status: "Active",
    collectionsAccountNumber: "1026889076",
    contactName: "JOHNDOE ENTERPRISES",
    contactEmail: "contact@johndoeenterprises.com",
    webhookUrl: "https://virtual-account-services.callback.redpay.africa/",
    createdAt: "Feb 2, 2025, 08:22:33 AM",
    approvedAt: "Feb 2, 2025, 08:54:50 AM",
  });

  const [merchantFees, setMerchantFees] = useState<MerchantFee[]>([
    {
      id: "1",
      name: "Open Account",
      description: "Fee to open a virtual account",
      fee: "0.00",
      feeType: "Flat",
      cap: "",
    },
    {
      id: "2",
      name: "Virtual Transaction",
      description: "Fee to perform a virtual transaction",
      fee: "0.50",
      feeType: "Percentage with Cap",
      cap: "500",
    },
  ]);

  const [merchantSetup, ] = useState<MerchantFee[]>([
    
    {
      id: "3",
      name: "Merchant Setup",
      description: "Fee to perform a virtual transaction",
      fee: "0.00",
      feeType: "Flat",
      cap: "",
    },
  ]);

  const handleEditToggle = (section: string) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = async (section: string) => {
    try {
      // TODO: PUT to API to save changes
      console.log("Saving changes for:", section);
      setEditMode((prev) => ({ ...prev, [section]: false }));
    } catch (error) {
      console.error("Error saving changes:", error);
      setError("Failed to save changes");
    }
  };

  const handleCancel = (section: string) => {
    setEditMode((prev) => ({ ...prev, [section]: false }));
    // TODO: Reset fields to original values
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting merchant info...");
  };

  // Update merchant detail field
  const updateMerchantDetailField = (field: keyof MerchantDetails, value: string) => {
    if (editMode["Merchant Account Details"]) {
      setMerchantDetails((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Update merchant fee field
  const updateMerchantFeeField = (feeId: string, field: keyof MerchantFee, value: string) => {
    if (editMode["Merchant Fees"]) {
      setMerchantFees((prev) =>
        prev.map((fee) => (fee.id === feeId ? { ...fee, [field]: value } : fee))
      );
    }
  };

  // Render Merchant Account Details form
  const renderMerchantDetailsForm = () => {
    const isEditing = editMode["Merchant Account Details"];

    return (
      <div className="p-4 pt-0 border-b">
        <div className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#A5A5A5]">Merchant</label>
              <input
                type="text"
                value={merchantDetails.merchant}
                onChange={(e) => updateMerchantDetailField("merchant", e.target.value)}
                className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-xs text-[#A5A5A5]">Merchant Code</label>
              <input
                type="text"
                value={merchantDetails.merchantCode}
                onChange={(e) => updateMerchantDetailField("merchantCode", e.target.value)}
                className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#A5A5A5]">Status</label>
              <div className="flex items-center gap-2 p-2 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm">{merchantDetails.status}</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-[#A5A5A5]">Collections Account Number</label>
              <input
                type="text"
                value={merchantDetails.collectionsAccountNumber}
                onChange={(e) => updateMerchantDetailField("collectionsAccountNumber", e.target.value)}
                className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#A5A5A5]">Contact Name</label>
              <input
                type="text"
                value={merchantDetails.contactName}
                onChange={(e) => updateMerchantDetailField("contactName", e.target.value)}
                className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-xs text-[#A5A5A5]">Contact Email</label>
              <input
                type="email"
                value={merchantDetails.contactEmail}
                onChange={(e) => updateMerchantDetailField("contactEmail", e.target.value)}
                className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-xs text-[#A5A5A5]">Webhook URL</label>
              <input
                type="text"
                value={merchantDetails.webhookUrl}
                onChange={(e) => updateMerchantDetailField("webhookUrl", e.target.value)}
                className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#A5A5A5]">Created At</label>
              <input
                type="text"
                value={merchantDetails.createdAt}
                className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                disabled
              />
            </div>
            <div>
              <label className="text-xs text-[#A5A5A5]">Approved At</label>
              <input
                type="text"
                value={merchantDetails.approvedAt}
                className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => handleCancel("Merchant Account Details")}>
                Cancel
              </Button>
              <Button onClick={() => handleSave("Merchant Account Details")}>
                <BiSave className="mr-1" /> Save
              </Button>
            </>
          ) : (
            <Button onClick={() => handleEditToggle("Merchant Account Details")}>
              <TbEdit className="mr-1" /> Edit Details
            </Button>
          )}
        </div>
      </div>
    );
  };

  // Render Merchant Fees form
  const renderMerchantFeesForm = () => {
    const isEditing = editMode["Merchant Fees"];

    return (
      <div className="p-4 pt-0 border-b">
        <div className="space-y-6">
          {merchantFees.map((fee) => (
            <div key={fee.id} className="pb-4 border-b last:border-b-0">
              <h4 className="text-sm font-medium mb-3">{fee.name}</h4>
              <p className="text-xs text-[#A5A5A5] mb-3">{fee.description}</p>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs text-[#A5A5A5]">Fee</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={fee.fee}
                    onChange={(e) => updateMerchantFeeField(fee.id, "fee", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-[#A5A5A5]">Fee Type</label>
                  <select
                    value={fee.feeType}
                    onChange={(e) => {
                      updateMerchantFeeField(fee.id, "feeType", e.target.value);
                      if (e.target.value !== "Percentage with Cap") {
                        updateMerchantFeeField(fee.id, "cap", "");
                      }
                    }}
                    className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                    disabled={!isEditing}
                  >
                    <option>Flat</option>
                    <option>Percentage with Cap</option>
                  </select>
                </div>
                {fee.feeType === "Percentage with Cap" && (
                  <div className="flex-1">
                    <label className="text-xs text-[#A5A5A5]">Cap</label>
                    <input
                      type="number"
                      placeholder="500"
                      value={fee.cap}
                      onChange={(e) => updateMerchantFeeField(fee.id, "cap", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                      disabled={!isEditing}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => handleCancel("Merchant Fees")}>
                Cancel
              </Button>
              <Button onClick={() => handleSave("Merchant Fees")}>
                <BiSave className="mr-1" /> Save
              </Button>
            </>
          ) : (
            <Button onClick={() => handleEditToggle("Merchant Fees")}>
              <TbEdit className="mr-1" /> Edit Fees
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderMerchantSetupForm = () => {
    const isEditing = editMode["Merchant Fees"];

    return (
      <div className="p-4 pt-0 border-b">
        <div className="space-y-6">
          {merchantSetup.map((fee) => (
            <div key={fee.id} className="pb-4 border-b last:border-b-0">
              <h4 className="text-sm font-medium mb-3">{fee.name}</h4>
              <p className="text-xs text-[#A5A5A5] mb-3">{fee.description}</p>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs text-[#A5A5A5]">Fee</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={fee.fee}
                    onChange={(e) => updateMerchantFeeField(fee.id, "fee", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-[#A5A5A5]">Fee Type</label>
                  <select
                    value={fee.feeType}
                    onChange={(e) => {
                      updateMerchantFeeField(fee.id, "feeType", e.target.value);
                      if (e.target.value !== "Percentage with Cap") {
                        updateMerchantFeeField(fee.id, "cap", "");
                      }
                    }}
                    className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                    disabled={!isEditing}
                  >
                    <option>Flat</option>
                    <option>Percentage with Cap</option>
                  </select>
                </div>
                {fee.feeType === "Percentage with Cap" && (
                  <div className="flex-1">
                    <label className="text-xs text-[#A5A5A5]">Cap</label>
                    <input
                      type="number"
                      placeholder="500"
                      value={fee.cap}
                      onChange={(e) => updateMerchantFeeField(fee.id, "cap", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md bg-gray-50"
                      disabled={!isEditing}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => handleCancel("Merchant Fees")}>
                Cancel
              </Button>
              <Button onClick={() => handleSave("Merchant Fees")}>
                <BiSave className="mr-1" /> Save
              </Button>
            </>
          ) : (
            <Button onClick={() => handleEditToggle("Merchant Fees")}>
              <TbEdit className="mr-1" /> Edit Fees
            </Button>
          )}
        </div>
      </div>
    );
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-transparent border-t-[#C80000] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center m-3">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex justify-between items-center">
          <span>{error}</span>
          <Button variant="link" size="sm" className="p-0 h-auto">
            Retry
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between mt-6 mb-8 px-3">
        <div>
          <h3 className="text-sm">Merchant Info</h3>
          <p className="text-xs text-[#A5A5A5]">
            This section contains all information relevant to this merchant.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport}>
            Export <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Merchant Account Details Accordion */}
        <div>
          <Button
            variant="ghost"
            className={`w-full flex items-center justify-between mb-6 pb-[35px] pt-4 ${
              expandedSection === "Merchant Account Details" ? "" : "border-b"
            } rounded-none`}
            onClick={() =>
              setExpandedSection(
                expandedSection === "Merchant Account Details" ? null : "Merchant Account Details"
              )
            }
          >
            <span className="text-start pl-0">
              <h3 className="text-sm">Merchant Account Details</h3>
              <p className="text-xs text-[#A5A5A5]">Merchant account info</p>
            </span>
            {expandedSection === "Merchant Account Details" ? (
              <IoIosArrowUp />
            ) : (
              <IoIosArrowDown />
            )}
          </Button>
          {expandedSection === "Merchant Account Details" && renderMerchantDetailsForm()}
        </div>

        {/* Merchant Fees Accordion */}
        <div>
          <Button
            variant="ghost"
            className={`w-full flex items-center justify-between mb-6 pb-[35px] pt-4 ${
              expandedSection === "Merchant Fees" ? "" : "border-b"
            } rounded-none`}
            onClick={() =>
              setExpandedSection(expandedSection === "Merchant Fees" ? null : "Merchant Fees")
            }
          >
            <span className="text-start pl-0">
              <h3 className="text-sm">Merchant Fees</h3>
              <p className="text-xs text-[#A5A5A5]">Merchant setup fee</p>
            </span>
            {expandedSection === "Merchant Fees" ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
          {expandedSection === "Merchant Fees" && renderMerchantFeesForm()}
        </div>

        {/* Merchant Setup Accordion */}
        <div>
          <Button
            variant="ghost"
            className={`w-full flex items-center justify-between mb-6 pb-[35px] pt-4 ${
              expandedSection === "Merchant Setup" ? "" : "border-b"
            } rounded-none`}
            onClick={() =>
              setExpandedSection(expandedSection === "Merchant Setup" ? null : "Merchant Setup")
            }
          >
            <span className="text-start pl-0">
              <h3 className="text-sm">Merchant Setup</h3>
              <p className="text-xs text-[#A5A5A5]">Fee to perform a virtual transaction</p>
            </span>
            {expandedSection === "Merchant Setup" ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
          {expandedSection === "Merchant Setup" && renderMerchantSetupForm()}
        </div>
      </div>
    </>
  );
}

export default MerchantInfo;