"use client";

import { Button } from '@/components/ui/button'
// import { Download } from 'lucide-react'
import React, { useState } from 'react'

import { Card, CardContent } from '@/components/ui/card';
// import { StaffsChart } from './_components/StaffsChart'
import { FiUserPlus } from 'react-icons/fi';
import StaffTable from './_components/StaffTable';
import { AddStaffModal } from './_components/AddStaffModal';




export default function StaffPage() {
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [, setRefreshKey] = useState(0);

  const handleRefreshTable = () => {
    setRefreshKey((prev) => prev + 1); // Trigger table refresh
  };

  return (
    <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm font-medium">Staff</h1>

        <div className="flex items-center space-x-2">
          <Button variant={"outline"}
          onClick={() => setIsAddStaffModalOpen(true)}>Add Staff <FiUserPlus /></Button>
          {/* <Button
            onClick={() => setIsExportModalOpen(true)}
            className=" hover:bg-[#A60000]  rounded-md"
          >
            Export
            <Download className="h-4 w-4 ml-2" />
          </Button> */}
        </div>
      </div>


      <div className="max-w-7xl">
        <div className="space-y-6">
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className='px-0'>
              <CardContent className='flex flex-col justify-between items-center h-full'>
                <div className=" w-full pb-8 h-[100px]">
                  <p className="text-xs text-[#A5A5A5]">Total Requests</p>
                  <h3 className="font-medium pt-3">1,234</h3>
                </div>
                <div className="border-t w-full pb-8 h-[100px]">
                  <p className="text-xs pt-3 text-[#A5A5A5]">Successful Requests</p>
                  <h3 className="font-medium pt-3">1,234</h3>
                </div>
                <div className="border-t w-full pb-8 h-[100px]">
                  <p className="text-xs pt-3 text-[#A5A5A5]">Average Response Time</p>
                  <h3 className="font-medium pt-3">245 ms</h3>
                </div>
              </CardContent>
            </Card>
            <StaffsChart />
          </div> */}
          <div>
          </div>
          <Card >
            <CardContent>
              <StaffTable />
            </CardContent>
          </Card>
        </div>
      </div>
      <AddStaffModal
      isOpen={isAddStaffModalOpen}
      onClose={() => setIsAddStaffModalOpen(false)}
      onSuccess={handleRefreshTable}/>
    </div>
  )
}

