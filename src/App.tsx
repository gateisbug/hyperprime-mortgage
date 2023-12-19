import { Header, Main, SearchField } from '@components';
import '@src/style/App.scss';
import { useSearch } from '@src/hooks';
import { ItemList } from '@components/ItemList';

function App() {
  const { value, setValue, onClickButton } = useSearch();

  const example: FundType[] = [
    {
      ticker: 'VOO',
      explains:
        "The fund employs an indexing investment approach designed to track the performance of the Standard & Poor's 500 Index, a widely recognized benchmark of U.S. stock market performance that is dominated by the stocks of large U.S. companies. The advisor attempts to replicate the target index by investing all, or substantially all, of its assets in the stocks that make up the index, holding each stock in approximately the same proportion as its weighting in the index.",
    },
    {
      ticker: 'QQQ',
      explains:
        'To maintain the correspondence between the composition and weights of the securities in the trust (the "securities") and the stocks in the NASDAQ-100 Index®, the adviser adjusts the securities from time to time to conform to periodic changes in the identity and/or relative weights of index securities. The composition and weighting of the securities portion of a portfolio deposit are also adjusted to conform to changes in the index.',
    },
    {
      ticker: 'SPY',
      explains:
        'The Trust seeks to achieve its investment objective by holding a portfolio of the common stocks that are included in the index (the “Portfolio”), with the weight of each stock in the Portfolio substantially corresponding to the weight of such stock in the index.',
    },
    {
      ticker: 'DIA',
      explains:
        'The Trust’s Portfolio consists of substantially all of the component common stocks that comprise the DJIA, which are weighted in accordance with the terms of the Trust Agreement.',
    },
  ];

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

          <ItemList funds={example} />
        </div>
      </Main>
    </div>
  );
}

export default App;
