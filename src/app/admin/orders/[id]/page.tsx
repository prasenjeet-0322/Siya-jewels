import React from "react";
import { OrderDetailAdminClient } from "./OrderDetailAdminClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Admin Order Detail & Fulfillment | Siya Jewels",
};

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <OrderDetailAdminClient orderId={resolvedParams.id} />;
}
