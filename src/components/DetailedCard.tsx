import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import type { FC } from "react";

interface DetailedCardProps {
  title: string;
  subtitle: string;
  body: string;
  buttonText: string;
  buttonHref: string;
}

const DetailedCard: FC<DetailedCardProps> = ({
  title,
  subtitle,
  body,
  buttonText,
  buttonHref,
}) => {
  const renderBody = (value: string | Document) => {
    if (typeof value === "string") {
      return <p>{value}</p>;
    }
    return documentToReactComponents(value);
  };

  return (
    <div className="scroll-mt-24 mt-12 max-w-4xl bg-white p-8 rounded-lg shadow-sm">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
      <p className="text-lg text-primary font-semibold mb-4">{subtitle}</p>
      <div className="space-y-4 text-[0.9375rem] leading-relaxed">
        <div>{renderBody(body)}</div>
        <div className="pt-4">
          <a href={buttonHref} className="btn btn-primary">
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
