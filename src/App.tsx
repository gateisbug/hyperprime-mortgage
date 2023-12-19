import { Header, Main, SearchField } from '@components';
import '@src/style/App.scss';
import { useSearch } from '@src/hooks';
import { ItemList } from '@components/ItemList';
import { useEffect, useState } from 'react';

function App() {
  const [funds, setFunds] = useState<FundType[]>([]);
  const [done, setDone] = useState<boolean>(false);

  const { value, setValue, onClickButton } = useSearch(setFunds, setDone);

  useEffect(() => {
    if (done && funds.length > 0) {
      console.log(funds);
      const element = document.createElement('a');
      const string = funds.map((v) => `${v.ticker}\n${v.explains}\n`);
      const file = new Blob([string.join('\n')], {
        type: 'text/plain',
      });
      element.href = URL.createObjectURL(file);
      element.download = 'crawling_output.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }, [done, funds]);

  return (
    <div>
      <Header />

      <Main>
        <div className='wrap typo p1 contents'>
          <SearchField
            value={value}
            setValue={setValue}
            onClickButton={onClickButton}
          />

          {funds.length > 0 ? (
            <ItemList funds={funds} />
          ) : (
            <p className='typo p1' style={{ textAlign: 'center' }}>
              There is no data to display.
            </p>
          )}
        </div>
      </Main>
    </div>
  );
}

export default App;
