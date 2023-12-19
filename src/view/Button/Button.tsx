import styles from './styles.module.css';
import {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';

type HTMLButtonAttrbute = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonVarientType = 'fill' | 'line' | 'text';

export interface ButtonProps extends HTMLButtonAttrbute {
  vx?: ButtonVarientType;
  full?: boolean;
}

export default function Button({
                                 vx = 'fill',
                                 full = false,
                                 className,
                                 children,
                                 ...props
                               }: ButtonProps) {
  return (
    <button
      className={`${styles.core} ${className}`}
      data-vx={vx}
      data-full={full}
      {...props}
    >
      {children}
    </button>
  );
}
