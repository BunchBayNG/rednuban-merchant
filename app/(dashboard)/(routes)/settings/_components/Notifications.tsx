"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface NotificationSettings {
  emailNotifications: {
    transactionUpdates: boolean;
    payoutAlerts: boolean;
    securityAlerts: boolean;
  };
  smsNotifications: {
    payoutSuccess: boolean;
    failedActions: boolean;
  };
  inAppNotifications: {
    enabled: boolean;
  };
  notificationFrequency: string;
}

function Notifications() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: {
      transactionUpdates: false,
      payoutAlerts: false,
      securityAlerts: false,
    },
    smsNotifications: {
      payoutSuccess: false,
      failedActions: false,
    },
    inAppNotifications: {
      enabled: false,
    },
    notificationFrequency: "immediate",
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleEmailNotificationChange = (key: keyof NotificationSettings["emailNotifications"]) => {
    setSettings((prev) => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: !prev.emailNotifications[key],
      },
    }));
  };

  const handleSMSNotificationChange = (key: keyof NotificationSettings["smsNotifications"]) => {
    setSettings((prev) => ({
      ...prev,
      smsNotifications: {
        ...prev.smsNotifications,
        [key]: !prev.smsNotifications[key],
      },
    }));
  };

  const handleInAppToggle = () => {
    setSettings((prev) => ({
      ...prev,
      inAppNotifications: {
        enabled: !prev.inAppNotifications.enabled,
      },
    }));
  };

  const handleFrequencyChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      notificationFrequency: value,
    }));
  };

  const renderEmailNotifications = () => {
    return (
      <div className="p-4 pt-0 border-b">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="transaction-updates"
              checked={settings.emailNotifications.transactionUpdates}
              onCheckedChange={() => handleEmailNotificationChange("transactionUpdates")}
            />
            <Label htmlFor="transaction-updates" className="text-sm font-normal cursor-pointer">
              Transaction Updates
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="payout-alerts"
              checked={settings.emailNotifications.payoutAlerts}
              onCheckedChange={() => handleEmailNotificationChange("payoutAlerts")}
            />
            <Label htmlFor="payout-alerts" className="text-sm font-normal cursor-pointer">
              Payout Alerts
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="security-alerts"
              checked={settings.emailNotifications.securityAlerts}
              onCheckedChange={() => handleEmailNotificationChange("securityAlerts")}
            />
            <Label htmlFor="security-alerts" className="text-sm font-normal cursor-pointer">
              Security Alerts
            </Label>
          </div>
        </div>
      </div>
    );
  };

  const renderSMSNotifications = () => {
    return (
      <div className="p-4 pt-0 border-b">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="payout-success"
              checked={settings.smsNotifications.payoutSuccess}
              onCheckedChange={() => handleSMSNotificationChange("payoutSuccess")}
            />
            <Label htmlFor="payout-success" className="text-sm font-normal cursor-pointer">
              Payout Success
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="failed-actions"
              checked={settings.smsNotifications.failedActions}
              onCheckedChange={() => handleSMSNotificationChange("failedActions")}
            />
            <Label htmlFor="failed-actions" className="text-sm font-normal cursor-pointer">
              Failed Actions
            </Label>
          </div>
        </div>
      </div>
    );
  };

  const renderInAppNotifications = () => {
    return (
      <div className="p-4 pt-0 border-b">
        <div className="flex items-center space-x-3">
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              settings.inAppNotifications.enabled ? "bg-red-600" : "bg-gray-300"
            }`}
            onClick={handleInAppToggle}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                settings.inAppNotifications.enabled ? "translate-x-6" : ""
              }`}
            />
          </div>
          <Label className="text-sm font-normal cursor-pointer" onClick={handleInAppToggle}>
            Enable
          </Label>
        </div>
      </div>
    );
  };

  const renderNotificationFrequency = () => {
    return (
      <div className="p-4 pt-0 border-b">
        <Select value={settings.notificationFrequency} onValueChange={handleFrequencyChange}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Immediate</SelectItem>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mt-6 mb-8 px-3">
        <div>
          <h3 className="text-sm font-medium">Notifications</h3>
          <p className="text-xs text-[#A5A5A5]">Configure your alert preferences for key activities</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Email Notifications Accordion */}
        <div>
          <Button
            variant="ghost"
            className={`w-full flex items-center justify-between mb-6 pb-[35px] pt-4 ${
              expandedSection === "Email Notifications" ? "" : "border-b"
            } rounded-none`}
            onClick={() => toggleSection("Email Notifications")}
          >
            <span className="text-start pl-0">
              <h3 className="text-sm font-normal">Email Notifications</h3>
              <p className="text-xs text-[#A5A5A5]">Receive email alerts for selected events</p>
            </span>
            {expandedSection === "Email Notifications" ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
          {expandedSection === "Email Notifications" && renderEmailNotifications()}
        </div>

        {/* SMS Notifications Accordion */}
        <div>
          <Button
            variant="ghost"
            className={`w-full flex items-center justify-between mb-6 pb-[35px] pt-4 ${
              expandedSection === "SMS Notifications" ? "" : "border-b"
            } rounded-none`}
            onClick={() => toggleSection("SMS Notifications")}
          >
            <span className="text-start pl-0">
              <h3 className="text-sm font-normal">SMS Notifications</h3>
              <p className="text-xs text-[#A5A5A5]">
                Requires a valid phone number. Enable SMS in General settings if needed.
              </p>
            </span>
            {expandedSection === "SMS Notifications" ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
          {expandedSection === "SMS Notifications" && renderSMSNotifications()}
        </div>

        {/* In-App Notifications Accordion */}
        <div>
          <Button
            variant="ghost"
            className={`w-full flex items-center justify-between mb-6 pb-[35px] pt-4 ${
              expandedSection === "In-App Notifications" ? "" : "border-b"
            } rounded-none`}
            onClick={() => toggleSection("In-App Notifications")}
          >
            <span className="text-start pl-0">
              <h3 className="text-sm font-normal">In-App Notifications</h3>
              <p className="text-xs text-[#A5A5A5]">Enable to receive alerts within the app.</p>
            </span>
            {expandedSection === "In-App Notifications" ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
          {expandedSection === "In-App Notifications" && renderInAppNotifications()}
        </div>

        {/* Notification Frequency Accordion */}
        <div>
          <Button
            variant="ghost"
            className={`w-full flex items-center justify-between mb-6 pb-[35px] pt-4 ${
              expandedSection === "Notification Frequency" ? "" : "border-b"
            } rounded-none`}
            onClick={() => toggleSection("Notification Frequency")}
          >
            <span className="text-start pl-0">
              <h3 className="text-sm font-normal">Notification Frequency</h3>
              <p className="text-xs text-[#A5A5A5]">Set how often you receive notifications.</p>
            </span>
            {expandedSection === "Notification Frequency" ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
          {expandedSection === "Notification Frequency" && renderNotificationFrequency()}
        </div>
      </div>
    </>
  );
}

export default Notifications;