"use client";

import ImageProcessor from "@/components/dashboard/image-processor";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ImageProcessor />
        </div>
      </div>
    </div>
  );
}