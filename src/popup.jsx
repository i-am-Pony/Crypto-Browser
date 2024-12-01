import React, { useState, useEffect } from 'react';
import PriceCalculation from './PriceCalculation';

function Popup() {
  const [piAmount, setPiAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const handlePayWithPiClick = () => {
    // Send a message to the content script to trigger price extraction
    chrome.runtime.sendMessage({ type: 'extractTotalPrice' });

    // Redirect to your crypto website with the calculated Pi amount
    const cryptoWebsiteUrl = `https://your-crypto-website.com/checkout?piAmount=${piAmount}`;
    window.open(cryptoWebsiteUrl, '_blank');
  };  // ... (rest of the component)

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <PriceCalculation
        onPiAmountCalculated={(piAmount) => setPiAmount(piAmount)}
        onError={(error) => setErrorMessage(error)}
      />
      <h2>Calculated Pi Amount: {piAmount}</h2>
      <button onClick={handlePayWithPiClick}>Pay with Pi</button>
    </div>
  );
}

export default Popup;