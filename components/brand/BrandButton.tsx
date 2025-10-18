import React from "react";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button"; href?: string };
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };
type Props = ButtonProps | AnchorProps;
export default function BrandButton(props: Props) {
  if (props.as === "a") {
    const { className = "", children, as: _as, ...anchorProps } = props as AnchorProps;
    return <a className={["smh-btn", className].join(" ")} {...anchorProps}>{children}</a>;
  }
  const { className = "", children, as: _as, href: _href, ...buttonProps } = props as ButtonProps;
  return <button className={["smh-btn", className].join(" ")} {...buttonProps}>{children}</button>;
}
