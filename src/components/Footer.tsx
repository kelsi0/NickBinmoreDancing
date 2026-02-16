"use client";

import Link from "next/link";
import { FooterContent } from "@/types/contentful";

export default function Footer(footerContent?: FooterContent) {
  return (
    <footer className="footer text-center md:text-left">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <p>{footerContent && footerContent.leftText}</p>
        <div className="flex gap-6 text-sm">
          <Link
            href="/privacy"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/insurance"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Insurance
          </Link>
        </div>
        <p>{footerContent && footerContent.rightText}</p>
      </div>
    </footer>
  );
}
