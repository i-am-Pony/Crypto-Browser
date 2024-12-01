chrome.runtime.sendMessage({
  type: 'extractTotalPrice'
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'extractTotalPrice') {
    const totalPriceElement = document.querySelector('.wix-cart-total-price'); // Adjust the selector as needed

    if (totalPriceElement) {
      const totalPrice = totalPriceElement.textContent.trim();
      chrome.runtime.sendMessage({
        type: 'totalPriceExtracted',
        totalPrice: totalPrice
      });
    } else {
      console.error('Could not find total price element');
    }
  }
});