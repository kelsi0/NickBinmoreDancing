"use client";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import {richTextOptions} from "@/lib/contentful-options";

interface LessonCardProps {
  title: string;
  description: string | Document;
  badge?: string;
  href?: string;
}

const LessonCard: FC<LessonCardProps> = ({
  title,
  description,
  badge,
  href,
}) => {
  const router = useRouter();
  const isAnchorLink = href ? href.includes("#") : false;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchorLink && href) {
      e.preventDefault();
      const [path, hash] = href.split("#");

      // If it's a different page, navigate then scroll
      if (path && path !== window.location.pathname) {
        router.push(href);
      } else {
        // Same page, just scroll
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const renderDescription = () => {
    if (typeof description === "string") {
      return <p>{description}</p>;
    }
    return documentToReactComponents(description, richTextOptions);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mx-4 md:mx-0 my-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg md:text-xl font-bold text-primary">{title}</h3>
        {badge && (
          <span className="inline-block bg-primary/10 text-primary border border-primary font-semibold text-xs px-3 py-1 rounded-full ml-2 align-middle shadow-sm">
            {badge}
          </span>
        )}
      </div>
      <div className="mb-4 text-sm md:text-base text-muted">
        {renderDescription()}
      </div>
      {href && (
        <div className="w-full flex justify-center md:justify-start">
          <Link href={href} onClick={handleClick} className="btn btn-primary w-full md:w-auto mt-2 block text-center">
            More Info
          </Link>
        </div>
      )}
    </div>
  );
};

export default LessonCard;
