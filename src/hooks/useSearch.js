import { useState } from 'react';

const { ipcRenderer } = window;

export default function useSearch(setFunds, setDone) {
  const [value, setValue] = useState('');

  const onClickButton = async () => {
    setDone(false);
    setFunds([]);
    const values = value.toUpperCase().replace(/,/g, '').split(' ');

    if (values.length > 0) {
      const init = await duplex('crawl-init');
      if (init === 'false') {
        return;
      }

      const output = [];
      for (let i = 0; i < values.length; i++) {
        const v = values[i];

        if (v.length === 0) continue;

        const data = {
          ticker: v,
          explains: 'Reading the data, please wait a moment.',
        };
        output.push(data);
        setFunds([...output]);

        const search = await duplex('crawl-search', 'https://www.etf.com/' + v);
        const fIndex = output.findIndex((f) => f.ticker === v);
        output[fIndex].explains = search.replace(/\n/g, '');

        if (search !== 'false') {
          output[fIndex].explains = search.replace(/\n/g, '');
        } else {
          output[fIndex].explains =
            'Failed to retrieve data. Please try again.';
        }

        setFunds([...output]);
      }

      await duplex('crawl-close');
      setDone(true);
    }
  };

  return {
    value,
    setValue,
    onClickButton,
  };
}

function waitForIPC(event) {
  return new Promise((res) => {
    ipcRenderer.once(event, (_, data) => {
      res(data);
    });
  });
}

async function send(event, data) {
  await ipcRenderer.send(event, data);
}

async function receive(event) {
  try {
    return await waitForIPC(event);
  } catch (e) {
    console.error('Error receiving IPC data:', e);
  }
}

async function duplex(event, data) {
  await send(event, data);
  return await receive(event);
}
