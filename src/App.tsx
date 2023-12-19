import { Header, Main, SearchField } from '@components';
import '@src/style/App.scss';
import { useSearch } from '@src/hooks';
import { ItemList } from '@components/ItemList';
import { useState } from 'react';

function App() {
  const [funds, setFunds] = useState<FundType[]>([]);

  const { value, setValue, onClickButton } = useSearch(setFunds);

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
