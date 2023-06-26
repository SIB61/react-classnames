import React from "react";
import { Styles } from "@sib61/jsx-classnames";
type Props = {
  children?: React.ReactNode;
  modules?: Array<any>;
};
export const Css = ({ children, modules }: Props)=> {
  if (!children) {
    return <></>;
  }
  if (!modules?.length || typeof children !== "object") {
    return <>{children}</>;
  }
  if (Array.isArray(children)) {
    return (
      <>
        {children?.map((child, i) => {
          return (
            <Css key={i} modules={modules}>
              {child}
            </Css>
          );
        })}
      </>
    );
  }
  children = children as React.ReactElement
  if (children.props?.children) {
    children = {
      ...children,
      props: {
        ...children.props,
        children: (
          <Css modules={modules}>
            {children.props.children}
          </Css>
        ),
      },
    };
  }
  if (children.props?.className) {
    const styles = Styles.from(...modules);
    children = {
      ...children,
      props: {
        ...children.props,
        className: styles(children.props.className),
      },
    };
  }
  return <>{children}</>;
}
