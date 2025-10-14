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
    <section className="hero px-4 md:px-0 pt-12 pb-8 bg-light-bg">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="flex-1 max-w-2xl">
          {tagLine && (
            <p className="text-base md:text-[1.5rem] font-semibold text-primary mb-2 tracking-wide text-center md:text-left">
              {tagLine}
            </p>
          )}
          <h1 className="text-xl md:text-[3rem] font-bold mb-3 leading-tight text-hero-dark text-center md:text-left">
            {title}
          </h1>
          <p className="text-sm md:text-[1.125rem] mb-6 md:mb-8 leading-relaxed text-hero-dark text-center md:text-left">
            {description}
          </p>
          <div className="flex gap-3 md:flex-gap-4 flex-wrap justify-center md:justify-start mb-6">
            {primaryButtonText &&
              (primaryButtonHref ? (
                <Link href={primaryButtonHref} className="btn btn-primary">
                  {primaryButtonText}
                </Link>
              ) : (
                <button type="button" className="btn btn-primary">
                  {primaryButtonText}
                </button>
              ))}
            {secondaryButtonText &&
              (secondaryButtonHref ? (
                <Link href={secondaryButtonHref} className="btn btn-secondary">
                  {secondaryButtonText}
                </Link>
              ) : (
                <button type="button" className="btn btn-secondary">
                  {secondaryButtonText}
                </button>
              ))}
          </div>
        </div>
        {showLogo && (
          <div className="w-full md:flex-1 flex justify-center md:justify-end items-center mb-4">
            <Image
              width={280}
              height={126}
              src="/logo.png"
              alt="Nick Binmore Dancing"
              className="max-w-[90px] max-h-[90px] md:max-h-full md:max-w-[280px] h-auto mx-auto md:mx-0 object-contain drop-shadow-lg"
              sizes="(max-width: 768px) 90px, 280px"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
