import React, { ReactNode, FC } from "react";

interface ShowProps {
  children?: ReactNode;
}

interface ShowWhenProps {
  isTrue: boolean;
  children?: ReactNode;
}

interface ShowElseProps {
  render?: ReactNode;
  children?: ReactNode;
}

const Show: FC<ShowProps> & {
  When: FC<ShowWhenProps>;
  Else: FC<ShowElseProps>;
} = ({ children }) => {
  let when: ReactNode | null = null;
  let otherwise: ReactNode | null = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if ((child.props as ShowWhenProps).isTrue === undefined) {
        otherwise = child;
      } else if (!when && (child.props as ShowWhenProps).isTrue === true) {
        when = child;
      }
    }
  });
  return when || otherwise;
};

const ShowWhen: FC<ShowWhenProps> = ({ isTrue, children }) =>
  isTrue ? (children as React.ReactElement) : null;

const ShowElse: FC<ShowElseProps> = ({ render, children }) =>
  render ? (render as React.ReactElement) : (children as React.ReactElement);

Show.When = ShowWhen;
Show.Else = ShowElse;

export default Show;
