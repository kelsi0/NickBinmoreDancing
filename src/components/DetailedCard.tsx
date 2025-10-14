import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import type {Document} from "@contentful/rich-text-types";
import type {FC} from "react";
import {richTextOptions} from "@/lib/contentful-options";

interface DetailedCardProps {
  title: string;
  subtitle: string;
  body?: string | null | Document;
  buttonText?: string | null;
  buttonHref?: string | null;
}

const DetailedCard: FC<DetailedCardProps> = ({
                                               title,
                                               subtitle,
                                               body,
                                               buttonText,
                                               buttonHref,
                                             }) => {
  const renderBody = (value: string | Document | null | undefined) => {
    if (typeof value === "string") {
      return <p>{value}</p>;
    }
    if (!value) {
      return null;
    }
    return documentToReactComponents(value, richTextOptions);
  };

  return (
    <div className="scroll-mt-24 mt-12 max-w-4xl md:max-w-full bg-white p-4 md:p-8 rounded-lg shadow-sm mx-4">
      <h3 className="text-xl md:text-3xl font-bold mb-4">{title}</h3>
      <p className="text-base md:text-lg text-primary font-semibold mb-4">{subtitle}</p>
      <div className="space-y-4 text-[0.9375rem] leading-relaxed">
        <div>{renderBody(body)}</div>
        {buttonHref && (
          <div className="pt-4">
            <a className="btn btn-primary">
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedCard;
