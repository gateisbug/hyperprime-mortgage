import {
  ChangeEvent,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './styles.module.css';

type HTMLTextAreaAttibute = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export interface TextareaProps extends Omit<HTMLTextAreaAttibute, 'value'> {
  value?: string;
  maxHeight?: number;
  autoResize?: boolean;
}

export default function Textarea({
  value,
  className,
  maxHeight,
  onChange,
  autoResize = true,
  style,
  ...props
}: TextareaProps) {
  // noinspection TypeScriptValidateTypes
  const ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>(value ?? '');

  const _onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onChange) {
      // noinspection TypeScriptValidateTypes
      onChange(e);
    }
  };

  const autoResizing = useCallback(() => {
    const textarea = ref.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const newHeight = maxHeight
      ? Math.min(textarea.scrollHeight, maxHeight)
      : textarea.scrollHeight;

    textarea.style.height = newHeight + 'px';
  }, [autoResize, ref, maxHeight]);

  useEffect(() => {
    if (!autoResize) return;

    autoResizing();
  }, [text]);

  const overflowY = (() => {
    if (!ref.current || !maxHeight) return 'hidden';

    return text.length > 0 && ref.current?.scrollHeight > maxHeight
      ? 'auto'
      : 'hidden';
  })();

  // noinspection JSAnnotator,TypeScriptValidateTypes
  return (
    <textarea
      ref={ref}
      className={`${styles.core} ${className}`}
      onChange={_onChange}
      style={{
        overflowY,
        ...style,
      }}
      value={value}
      {...props}
    ></textarea>
  );
}
