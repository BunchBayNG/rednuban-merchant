"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { TbEdit } from "react-icons/tb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function General() {
  const [isEditing, setIsEditing] = useState(false);
  const [addressLength, setAddressLength] = useState("");
  const [formData, setFormData] = useState({
    businessName: "John Doe Enterprises",
    businessEmail: "johndoe@gmail.com",
    phone: "+234 812 345 6789",
    role: "Super Admin",
    address: "12 Lagos Street, Ikeja",
    avatar: "/placeholder-avatar.jpg",
    currency: "NGN",
    timeZone: "WAT",

  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
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
          <Camera className="w-6 h-6 text-white absolute top-0 right-0 bg-red-600 rounded-full p-1 cursor-pointer" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm text-gray-500">Business Name</Label>
          <Input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-sm text-gray-500">Business Email</Label>
          <Input
            type="email"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-sm text-gray-500">Business Phone Number</Label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-sm text-gray-500">Time Zone</Label>
          <Select
            value={formData.timeZone}
            onValueChange={handleSelectChange("timeZone")}
            disabled={!isEditing}
          >
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Select Time Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WAT">WAT</SelectItem>
              <SelectItem value="GMT">GMT</SelectItem>
              <SelectItem value="EST">EST</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Currency</Label>
          <Select
            value={formData.currency}
            onValueChange={handleSelectChange("currency")}
            disabled={!isEditing}
          >
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NGN">NGN</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Address</Label>
          <div className="relative">
          <Input
            type="text"
            value={addressLength}
            onChange={(e) => {
              if (e.target.value.length <= 200) setAddressLength(e.target.value);
            }}
            className="mt-1 "
            disabled={!isEditing}
          />
           <span className="text-xs text-gray-500 absolute right-1 top-2.5">
              {addressLength.length}/200
            </span>
            </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleEditToggle}
          className="mt-4 text-white flex items-center justify-center"
        >
          <TbEdit />
          {isEditing ? "Save Changes" : "Edit Account Details"}
        </Button>
      </div>
    </div>
  );
}