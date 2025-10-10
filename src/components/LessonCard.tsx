"use client";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import type { FC } from "react";

interface LessonCardProps {
  title: string;
  description: string;
  badge?: string;
  href?: string;
}

const LessonCard: FC<LessonCardProps> = ({
  title,
  description,
  badge,
  href = "/contact",
}) => {
  const isAnchorLink = href.includes("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchorLink) {
      e.preventDefault();
      const targetId = href.split("#")[1];
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const renderDescription = () => {
    if (typeof description === "string") {
      return <p>{description}</p>;
    }
    return documentToReactComponents(description);
  };

  return (
    <div className="card flex flex-col h-full">
      <div className="min-h-[2rem] mb-4">
        {badge && <span className="badge">{badge}</span>}
      </div>
      <h3 className="text-[1.375rem] font-bold mb-3">{title}</h3>
      <div className="text-[0.9375rem] text-muted mb-6 flex-grow leading-relaxed">
        {renderDescription()}
      </div>
      {isAnchorLink ? (
        <a
          href={href}
          onClick={handleClick}
          className="btn btn-primary w-full md:w-fit"
        >
          Learn more
        </a>
      ) : (
        <Link
          href={`${href}?lesson=${encodeURIComponent(title)}`}
          className="btn btn-primary w-full md:w-fit"
        >
          Learn more
        </Link>
      )}
    </div>
  );
};

export default LessonCard;
