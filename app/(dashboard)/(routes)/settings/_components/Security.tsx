"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Lock from "@/components/svg Icons/Lock";
import { Eye, EyeOff } from "lucide-react";

export default function Security() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe A.",
    role: "Merchant Admin",
    avatar: "/placeholder-avatar.jpg",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-center space-x-4 mb-4 relative">
        <div className="relative">
          <img
            src={formData.avatar}
            alt="User Avatar"
            className="w-16 h-16 rounded-full"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="avatar-upload"
          />

          <div className="mt-2">
            <p className="font-medium text-sm">{formData.name}</p>
            <p className="text-red-600 text-xs">{formData.role}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type={showCurrentPassword ? "text" : "password"}
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 pl-8"
            placeholder="Current Password"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setShowCurrentPassword((prev) => !prev)}
          >
            {showCurrentPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 pl-8"
              placeholder="New Password"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 pl-8"
              placeholder="Confirm New Password"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleEditToggle}
          className="mt-4 flex items-center justify-center"
        >
          {isEditing ? "Save Changes" : "Edit Password"}
        </Button>
      </div>
    </div>
  );
}