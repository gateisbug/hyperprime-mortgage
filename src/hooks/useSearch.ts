import { useState } from 'react';

export default function useSearch() {
  const [value, setValue] = useState('');

  const onClickButton = () => {
    console.log(value);
  };

  return {
    value,
    setValue,
    onClickButton,
  };
}
