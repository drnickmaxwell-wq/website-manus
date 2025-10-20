"use client";
import React from "react";

type ButtonVariantProps = {
  as?: "button";
  href?: undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorVariantProps = {
  as: "a";
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type SparkleButtonProps = (ButtonVariantProps | AnchorVariantProps) & {
  className?: string;
  children: React.ReactNode;
};

/** SparkleButton_Lux — brand CTA with gold micro-glow and subtle scale. */
export default function SparkleButton_Lux(props: SparkleButtonProps) {
  if (props.as === "a") {
    const { className = "", children, href, ...anchorRest } = props;
    const { as: anchorAs, ...cleanAnchorRest } = anchorRest as AnchorVariantProps;
    void anchorAs;
    const classes = ["smh-btn", className].join(" ").trim();
    return (
      <a href={href} className={classes} {...cleanAnchorRest}>
        {children}
      </a>
    );
  }

  const { className = "", children, ...buttonRest } = props;
  const { as: buttonAs, ...cleanButtonRest } = buttonRest as ButtonVariantProps;
  void buttonAs;
  const classes = ["smh-btn", className].join(" ").trim();
  return (
    <button className={classes} {...cleanButtonRest}>
      {children}
    </button>
  );
}
