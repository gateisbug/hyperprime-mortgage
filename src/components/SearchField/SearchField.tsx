import styles from './styles.module.scss';
import { Button, Input, InputBox } from '@view';

interface Props {
  value: string;
  setValue: SetStateType<string>;
  onClickButton: OnClickType;
}

export default function SearchField({ value, setValue, onClickButton }: Props) {
  return (
    <div className={styles.search}>
      <InputBox>
        <Input
          className='typo p1'
          placeholder='Please Input Ticker | ex) QQQ SPY DIA'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={1}
        />
      </InputBox>
      <Button className='typo button' onClick={onClickButton}>
        Search
      </Button>
    </div>
  );
}
