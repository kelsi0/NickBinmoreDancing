import { BLOCKS } from "@contentful/rich-text-types";

export const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_node: any, children: any) => (
      <h1 className="text-4xl font-bold mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node: any, children: any) => (
      <h2 className="text-3xl font-bold mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: any, children: any) => (
      <h3 className="text-2xl font-bold mb-3">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node: any, children: any) => (
      <h4 className="text-xl font-semibold mb-3">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_node: any, children: any) => (
      <h5 className="text-lg font-semibold mb-2">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_node: any, children: any) => (
      <h6 className="text-base font-semibold mb-2">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 ml-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: any, children: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
      const childrenArray = Array.isArray(children) ? children : [children];
      const unwrappedChildren = childrenArray.map((child) => {
        if (child?.props?.children) {
          return child.props.children;
        }
        return child;
      });

      return <li className="text-muted">{unwrappedChildren}</li>;
    },
  },
};