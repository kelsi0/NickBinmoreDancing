"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ links, onClose }) => {
  const pathname = usePathname();

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
      <div className="container py-6 space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`block text-base font-medium hover:text-primary transition-colors py-2 ${
              pathname === link.href
                ? "text-primary font-semibold"
                : "text-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={onClose}
          className="btn btn-primary w-full mt-4 text-center inline-block"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
