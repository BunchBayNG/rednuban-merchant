import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "./General";
import Security from "./Security";
import RolesPrivileges from "./RolesPrivileges";
import MerchantInfo from "./MerchantInfo";
import Notifications from "./Notifications";
import ApiConfig from "./ApiConfig";


export default function AccountPage() {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="account-details" className="w-full">
        <TabsList className="grid  grid-cols-6 dark:bg-background">
          <TabsTrigger value="account-details">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="roles-privileges">Roles & Privileges</TabsTrigger>
          <TabsTrigger value="services">Merchant Info</TabsTrigger>
          <TabsTrigger value="third-parties">Notifications</TabsTrigger>
          <TabsTrigger value="variables-config">API Config</TabsTrigger>
        </TabsList>
        <TabsContent value="account-details">
          <General />
        </TabsContent>
        <TabsContent value="security">
          <Security />
        </TabsContent>
        <TabsContent value="roles-privileges">
          <RolesPrivileges />
        </TabsContent>
        <TabsContent value="services">
          <MerchantInfo />
        </TabsContent>
        <TabsContent value="third-parties">
          <Notifications />
        </TabsContent>
        <TabsContent value="variables-config">
          <ApiConfig />
        </TabsContent>
      </Tabs>
    </div>
  );
}