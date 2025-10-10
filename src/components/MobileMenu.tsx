"use client";

import Link from "next/link";
import { FC } from "react";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ links, onClose }) => {
  return (
    <div className="md:hidden bg-background border-t border-gray-200 py-6 px-4 space-y-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="block text-body font-medium hover:text-primary"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/book"
        onClick={onClose}
        className="btn btn-primary w-full mt-4 text-center"
      >
        Book now
      </Link>
    </div>
  );
};

export default MobileMenu;
