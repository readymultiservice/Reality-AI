import React from 'react';
import { SitemapIcon, PageIcon, FlowIcon, UserRoleIcon } from './Icons';

interface PageInfo {
  title: string;
  purpose: string;
  components: string[];
  flow: string;
}

interface RoleSection {
  role: string;
  icon: React.ReactElement;
  pages: PageInfo[];
}

const sitemapData: RoleSection[] = [
  {
    role: "Guest / Buyer",
    icon: <UserRoleIcon className="h-8 w-8 text-brand-teal" />,
    pages: [
      {
        title: "Homepage",
        purpose: "Main landing page to attract users and provide primary search functionality.",
        components: ["Header", "Hero Search Bar", "Featured Properties", "Popular Locations", "Footer"],
        flow: "Entry point for all users. Leads to Search Results or Property Details pages."
      },
      {
        title: "Search Results Page",
        purpose: "Display properties matching user's search criteria with advanced filtering options.",
        components: ["Advanced Filters Sidebar", "Sort Options", "Property List/Grid View", "Map View Toggle", "Pagination"],
        flow: "Accessed via Homepage search. Leads to Property Details or Comparison Page."
      },
      {
        title: "Property Details Page",
        purpose: "Provide comprehensive information about a single property.",
        components: ["Image Gallery/Video", "Property Info", "Amenities List", "Contact Agent Form", "Similar Properties"],
        flow: "Accessed from Search Results. Leads to sending an inquiry."
      },
      {
        title: "Login / Register Page",
        purpose: "Allow users to create an account or sign in.",
        components: ["Email/Password Fields", "Social Login Buttons", "Role Selection", "Forgot Password Link"],
        flow: "Accessed from Header. Leads to User Dashboard upon successful authentication."
      }
    ]
  },
  {
    role: "Seller / Agent",
    icon: <UserRoleIcon className="h-8 w-8 text-brand-blue" />,
    pages: [
       {
        title: "User Dashboard",
        purpose: "Central hub for users to manage their properties and interactions.",
        components: ["Active Listings", "Pending Listings", "Received Inquiries", "Profile Settings", "Payment History"],
        flow: "Accessed after login. Leads to Add/Edit Property page."
      },
      {
        title: "Add / Edit Property Page",
        purpose: "A form for sellers/agents to list a new property or update an existing one.",
        components: ["Property Info Fields", "Image/Video Uploader", "Amenities Checklist", "Premium Listing Option"],
        flow: "Accessed from Dashboard. Submitting a new property requires Admin approval."
      }
    ]
  },
   {
    role: "Admin",
    icon: <UserRoleIcon className="h-8 w-8 text-gray-600" />,
    pages: [
       {
        title: "Admin Panel",
        purpose: "Backend interface for site administrators to manage all aspects of the platform.",
        components: ["User Management Table", "Property Approval Queue", "Payment Tracking", "Site Analytics", "Content Manager"],
        flow: "Accessible only to users with admin privileges. Provides full control over the application's data."
      }
    ]
  }
];

const PageCard: React.FC<{ page: PageInfo }> = ({ page }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full flex flex-col">
        <h4 className="text-xl font-bold text-brand-blue mb-3">{page.title}</h4>
        <p className="text-sm text-gray-600 mb-4 flex-grow"><strong className="font-semibold text-gray-800">Purpose:</strong> {page.purpose}</p>
        <div className="space-y-3 text-sm">
            <div>
                <h5 className="font-semibold text-gray-800 flex items-center mb-1"><PageIcon className="h-4 w-4 mr-2 text-brand-teal" />Components</h5>
                <ul className="list-disc list-inside text-gray-500 pl-2">
                    {page.components.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
            </div>
            <div>
                <h5 className="font-semibold text-gray-800 flex items-center mb-1"><FlowIcon className="h-4 w-4 mr-2 text-brand-teal" />User Flow</h5>
                <p className="text-gray-500 pl-2">{page.flow}</p>
            </div>
        </div>
    </div>
);


export const Sitemap: React.FC = () => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg my-12 border border-gray-100">
            <div className="text-center mb-10">
                <SitemapIcon className="mx-auto h-12 w-12 text-brand-blue mb-2" />
                <h2 className="text-3xl font-extrabold text-brand-blue">Website Structure & Page Flow</h2>
                <p className="text-md text-gray-500 mt-2">A blueprint for the application's pages and user journeys.</p>
            </div>

            <div className="space-y-12">
                {sitemapData.map((section) => (
                    <div key={section.role}>
                        <div className="flex items-center space-x-3 mb-6 pb-2 border-b-2 border-brand-teal">
                            {section.icon}
                            <h3 className="text-2xl font-bold text-gray-800">{section.role}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {section.pages.map(page => <PageCard key={page.title} page={page} />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}