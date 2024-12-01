import React from 'react';
import ReactDOM from 'react-dom/client';

function Popup() {
  const [piAmount, setPiAmount] = React.useState(0);

  React.useEffect(() => {
    chrome.runtime.sendMessage({ type: 'fetchTotalPrice' }, (response) => {
      const totalPrice = response.totalPrice;
      // Fetch Pi price from background script
      chrome.runtime.sendMessage({ type: 'fetchPiPrice' }, (response) => {
        const piPrice = response.piPrice;
        const calculatedPiAmount = totalPrice / piPrice;
        setPiAmount(calculatedPiAmount);
      });
    });
  }, []);

  return (
    <div>
      <h2>Calculated Pi Amount: {piAmount}</h2>
      <button>Pay with Pi</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Popup />);