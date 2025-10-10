"use client";

import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  tagLine?: string;
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  primaryButtonAction?: () => void;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  secondaryButtonAction?: () => void;
  showLogo?: boolean;
}

export default function Hero({
  tagLine,
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonHref,
  secondaryButtonAction,
  showLogo = true,
}: HeroProps) {
  return (
    <section className="hero">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 max-w-2xl">
          {tagLine && (
            <p className="text-[1.5rem] font-semibold text-primary mb-3 tracking-wide">
              {tagLine}
            </p>
          )}
          <h1 className="text-[2.5rem] md:text-[3rem] font-bold mb-4 leading-tight text-hero-dark">
            {title}
          </h1>
          <p className="text-[1.125rem] mb-8 leading-relaxed text-hero-dark">
            {description}
          </p>
          <div className="flex gap-4 flex-wrap">
            {primaryButtonText &&
              (primaryButtonHref ? (
                <Link href={primaryButtonHref} className="btn btn-primary">
                  {primaryButtonText}
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={primaryButtonAction}
                >
                  {primaryButtonText}
                </button>
              ))}
            {secondaryButtonText &&
              (secondaryButtonHref ? (
                <Link href={secondaryButtonHref} className="btn btn-secondary">
                  {secondaryButtonText}
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={secondaryButtonAction}
                >
                  {secondaryButtonText}
                </button>
              ))}
          </div>
        </div>
        {showLogo && (
          <div className="flex-1 flex justify-center md:justify-end">
            <Image
              width="360"
              height="360"
              src="/logo.png"
              alt="Nick Binmore Dancing"
              className="max-w-[280px] md:max-w-[360px] h-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
}
