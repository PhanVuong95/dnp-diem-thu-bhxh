import React, { PropsWithChildren } from "react";

const FlexBox = (
  props: PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>>
) => {
  return <div {...props} className={`flex ${props.className}`} />;
};

export default FlexBox;