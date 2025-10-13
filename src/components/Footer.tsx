"use client";

import { FooterContent } from "@/types/contentful";

export default function Footer(footerContent?: FooterContent) {
  return (
    <footer className="footer text-center md:text-left">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <p>{footerContent && footerContent.leftText}</p>
        <p>{footerContent && footerContent.rightText}</p>
      </div>
    </footer>
  );
}
