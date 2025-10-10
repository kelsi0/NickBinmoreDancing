"use client";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  href,
}) => {
  console.log(title + " href: " + href);
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
      <Link
        href={href || `/contact?lesson=${encodeURIComponent(title)}`}
        onClick={handleClick}
        className="btn btn-primary w-full md:w-fit"
      >
        Learn more
      </Link>
    </div>
  );
};

export default LessonCard;
