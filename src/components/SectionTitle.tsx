"use client";

import { FC } from "react";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title }) => (
  <h2 className="section-title">{title}</h2>
);

export default SectionTitle;
