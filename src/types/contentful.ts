import type {Document} from "@contentful/rich-text-types";

export interface SectionContent {
  fields: {
    sectionTitle: string;
    richText?: string | Document;
    content?: CardContent[];
  };
}

export interface HeroContent {
  tagLine: string;
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

export interface PageData {
  items: Array<{
    fields: {
      hero: {
        fields: HeroContent;
      };
      sections: SectionContent[];
    };
  }>;
}

export interface CardContent {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: {
    title: string;
    subtitle: string;
    description: string | Document;
    body?: string | Document;
    buttonText?: string | null;
    buttonHref?: string | null;
    richText?: string | Document;
    tag?: string;
    link?: string;
  };
}

export interface FooterContent {
  leftText?: string;
  rightText?: string;
}
