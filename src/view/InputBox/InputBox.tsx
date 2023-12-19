import styles from './style.module.css';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type HTMLDivAttribute = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function InputBox({
  children,
  className,
  ...props
}: HTMLDivAttribute) {
  return (
    <div className={`${styles.core} ${className}`} {...props}>
      {children}
    </div>
  );
}
