import React from "react";
import { Styles } from "@sib61/jsx-classnames";
type FnProps = {
  children?: React.ReactNode;
  styles: (classname: string) => string;
  ignore?: React.ReactNode[];
};
function replaceClassName({ styles, ignore, children }: FnProps): any {
  if (typeof children !== "object" || ignore?.some((ig) => ig == children)) {
    return children;
  }
  if (Array.isArray(children)) {
    children = children.map((child) =>
      replaceClassName({ children: child, styles, ignore })
    );
  } else {
    if (React.isValidElement(children)) {
      const props = { ...children.props };
      if (props.children) {
        props.children = replaceClassName({
          children: props.children,
          styles,
          ignore,
        });
      }
      let className = "";
      if (typeof children.type === "string") {
        const typeStyles = styles(children.type);
        if (typeStyles.trim() !== children.type) {
          className += typeStyles;
        }
      }
      if (props.className) {
        className += styles(props.className);
      }
      if (className) {
        props.className = className;
      }
      if (props.className || props.children) {
        children = { ...children, props };
      }
    }
  }
  return children;
}

type CmpProps = {
  children?: React.ReactNode;
  module: {
    [key: string]: string;
  };
  ignore?: React.ReactNode[] | React.ReactNode;
};

export const Css = ({ children, module, ignore }: CmpProps) => {
  try {
    if (module) {
      const styles = Styles.from(module);
      if(ignore && !Array.isArray(ignore)){
        ignore = [ignore]
      }
      children = replaceClassName({
        children,
        styles,
        ignore: ignore as React.ReactNode[],
      });
    }
  } catch (err) {}
  return <>{children}</>;
};
