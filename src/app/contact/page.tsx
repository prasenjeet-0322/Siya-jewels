import React from "react";
import { ContactClient } from "./ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Store Locators | Siya Jewels",
  description: "Get in touch with our master jewellery stylists or visit our flagship boutiques in Mumbai, Delhi, and Bengaluru.",
};

export default function ContactPage() {
  return <ContactClient />;
}
