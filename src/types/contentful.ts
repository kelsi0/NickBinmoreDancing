import type { Document } from "@contentful/rich-text-types";

export interface LessonCardContent {
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
    description: string | Document;
    tag?: string;
    href?: string;
  };
}

export interface Section {
  fields: {
    sectionTitle: string;
    content?: LessonCardContent[];
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
      sections: Section[];
    };
  }>;
}

export interface DetailedCardContent {
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
    description: string | Document;
    body?: string | Document;
    buttonText?: string;
    buttonHref?: string;
  };
}
