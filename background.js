let piPrice = 0;

chrome.alarms.create('fetchPiPrice', { periodInMinutes: 15 }); // Adjust the period as needed

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'fetchPiPrice') {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=pi&vs_currencies=usd') // Replace with actual API endpoint
      .then(response => response.json())
      .then(data => {
        piPrice = data.price;
        console.log('Fetched Pi price:', piPrice);
      })
      .catch(error => {
        console.error('Error fetching Pi price:', error);
      });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'calculatePiAmount') {
    const totalPrice = request.totalPrice;
    const calculatedPiAmount = totalPrice / piPrice;
    sendResponse({ piAmount: calculatedPiAmount });
  } else if (request.type === 'fetchPiPrice') {
    sendResponse({ piPrice });
  }
  // ... other message handling
});