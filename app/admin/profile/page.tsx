import ProfileSettings from "@/components/ProfileSettings";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile | Admin Panel",
    description: "Manage your profile settings",
};

export default function AdminProfilePage() {
    return <ProfileSettings userRole="admin" />;
}
