"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Eye, EyeOff, Search,  Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface APIKeys {
  vasPublicKey: string;
  merchantPublicKey: string;
  merchantPrivateKey: string;
  webhookUrl: string;
  whitelistIPs: string;
}

function APIConfiguration() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleKeys, setVisibleKeys] = useState<{ [key: string]: boolean }>({
    vasPublicKey: false,
    merchantPublicKey: false,
    merchantPrivateKey: false,
  });

  const [apiKeys, setApiKeys] = useState<APIKeys>({
    vasPublicKey: "sk_test_1234567890abcdefghijklmnopqrstuvwxyz",
    merchantPublicKey: "pk_test_1234567890abcdefghijklmnopqrstuvwxyz",
    merchantPrivateKey: "sk_live_1234567890abcdefghijklmnopqrstuvwxyz",
    webhookUrl: "https://virtual-account-service-callback.redpay.africa/",
    whitelistIPs: "",
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleKeyVisibility = (key: string) => {
    setVisibleKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
    console.log("Copied to clipboard:", text);
  };

  const handleGenerate = (keyType: string) => {
    // TODO: Call API to generate new key
    console.log("Generating new key for:", keyType);
  };

  const handleSaveChanges = () => {
    // TODO: Call API to save webhook URL and whitelist IPs
    console.log("Saving changes:", apiKeys);
  };

  const maskKey = (key: string): string => {
    return "•".repeat(key.length);
  };

  const sections = [
    {
      id: "VAS_PUBLIC_KEY",
      title: "VAS_PUBLIC_KEY",
      description: "This is the Virtual Account Service public key",
      tooltip:
        "Use this to encrypt your AES symmetric Key (Secure Token) While consuming the Virtual Account Service API.",
      hasGenerate: true,
    },
    {
      id: "MERCHANT_PUBLIC_KEY",
      title: "MERCHANT_PUBLIC_KEY",
      description: "This is your Merchant public key",
      tooltip:
        "Virtual Account Service will encrypt the AES symmetric key ( Secure Token) using your public key while notifying you of a transaction event.",
      hasGenerate: true,
    },
    {
      id: "MERCHANT_PRIVATE_KEY",
      title: "MERCHANT_PRIVATE_KEY",
      description: "This ket is available once after generation. Make sure to copy and store on your system.",
      tooltip:
        "Use the key to decrypt the (Secure Token) from Virtual Account Service. Click the generate button above if you wish to generate fresh keys",
      hasGenerate: true,
    },
    {
      id: "WEBHOOK_URL",
      title: "Webhook URL",
      description: "Set your webhook url to receive notifications from Virtual Account Service.",
      tooltip: null,
      hasGenerate: false,
    },
  ];

  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderKeySection = (keyId: string, keyValue: string) => {
    const isVisible = visibleKeys[keyId];

    return (
      <div className="p-4 pt-0 border-b">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              value={isVisible ? keyValue : maskKey(keyValue)}
              readOnly
              className="pr-10 bg-gray-50 font-mono text-sm"
            />
            <button
              onClick={() => toggleKeyVisibility(keyId)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <Button variant="outline" onClick={() => handleCopy(keyValue)}>
            Copy
          </Button>
          <Button variant="destructive" onClick={() => handleGenerate(keyId)}>
            Generate
          </Button>
        </div>
      </div>
    );
  };

  const renderWebhookSection = () => {
    return (
      <div className="p-4 pt-0 border-b">
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              value={apiKeys.webhookUrl}
              onChange={(e) => setApiKeys({ ...apiKeys, webhookUrl: e.target.value })}
              className="bg-gray-50"
              placeholder="https://your-webhook-url.com"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label className="text-sm">Webhook URL</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">
                      Set the value ina comma separated (csv) format (Sample input: x.x.x.x, y.y.y.y, z.z.z.z).
                      Kindly note that this is optional and access is given to only whitelisted IPs when saved
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-xs text-[#A5A5A5]">Whitelist IPs for your API calls to Virtual Account Service</span>
            </div>
            <Input
              type="text"
              value={apiKeys.whitelistIPs}
              onChange={(e) => setApiKeys({ ...apiKeys, whitelistIPs: e.target.value })}
              className="bg-gray-50"
              placeholder="x.x.x.x, y.y.y.y, z.z.z.z"
            />
          </div>

          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mt-6 mb-8 px-3">
        <div>
          <h3 className="text-sm font-medium">API Configurations & Settings</h3>
          <p className="text-xs text-[#A5A5A5]">
            Your RISA Credentials for consuming APIs are here. Click{" "}
            <a href="#" className="text-red-600 underline">
              here
            </a>{" "}
            to access the API Docs
          </p>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Configuration ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredSections.map((section) => (
          <div key={section.id}>
            <Button
              variant="ghost"
              className={`w-full flex items-center justify-between mb-6 pb-[35px] pt-4 ${
                expandedSection === section.id ? "" : "border-b"
              } rounded-none`}
              onClick={() => toggleSection(section.id)}
            >
              <span className="text-start pl-0 flex items-start gap-2">
                <div>
                  <h3 className="text-sm font-normal">{section.title}</h3>
                  <p className="text-xs text-[#A5A5A5]">{section.description}</p>
                </div>
                {section.tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400 cursor-help mt-0.5" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">{section.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </span>
              {expandedSection === section.id ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </Button>

            {expandedSection === section.id && (
              <>
                {section.id === "VAS_PUBLIC_KEY" &&
                  renderKeySection("vasPublicKey", apiKeys.vasPublicKey)}
                {section.id === "MERCHANT_PUBLIC_KEY" &&
                  renderKeySection("merchantPublicKey", apiKeys.merchantPublicKey)}
                {section.id === "MERCHANT_PRIVATE_KEY" &&
                  renderKeySection("merchantPrivateKey", apiKeys.merchantPrivateKey)}
                {section.id === "WEBHOOK_URL" && renderWebhookSection()}
              </>
            )}
          </div>
        ))}

        {filteredSections.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No configurations found matching &apos;{searchQuery}&apos;</p>
          </div>
        )}
      </div>
    </>
  );
}

export default APIConfiguration;