import React from "react";
import { getOrderById } from "@/lib/firestoreService";
import { OrderSuccessClient } from "./OrderSuccessClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Order Confirmed | Siya Jewels",
  description: "Thank you for your fine jewellery order with Siya Jewels.",
};

export default async function OrderSuccessPage({ params }: PageProps) {
  const resolvedParams = await params;
  const order = await getOrderById(resolvedParams.id);

  return <OrderSuccessClient order={order} orderId={resolvedParams.id} />;
}
