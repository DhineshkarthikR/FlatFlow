import ProfileSettings from "@/components/ProfileSettings";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile | Resident Portal",
    description: "Manage your profile settings",
};

export default function ResidentProfilePage() {
    return <ProfileSettings userRole="resident" />;
}
