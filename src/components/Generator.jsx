// CreditCardForm.js
import { h } from 'preact';
import { useState } from 'preact/hooks';

const CreditCardForm = () => {
  const [cardDetails, setCardDetails] = useState([]);
  const [numToGenerate, setNumToGenerate] = useState(5); // Default number to generate
  const [generateCVV, setGenerateCVV] = useState(false);
  const [generateExpiry, setGenerateExpiry] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState('Visa');

  const generateRandomNumber = (length) => {
    const randomNumber = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    return randomNumber.toString();
  };

  const generateCVVNumber = () => {
    return Math.floor(Math.random() * 900 + 100).toString();
  };

  const generateExpiryDate = () => {
    const currentYear = new Date().getFullYear();
    const randomYear = currentYear + Math.floor(Math.random() * 5); // Expiry date within the next 5 years
    const randomMonth = Math.floor(Math.random() * 12) + 1; // Month between 1 and 12
    return `${randomMonth.toString().padStart(2, '0')}/${randomYear.toString().slice(2)}`;
  };

  const generateCreditCardDetails = () => {
    const generatedDetails = [];
    for (let i = 0; i < numToGenerate; i++) {
      const randomCardNumber = generateRandomNumber(16);
      const luhnCheckDigit = randomCardNumber
        .split('')
        .reverse()
        .map((digit, index) => (index % 2 === 0 ? parseInt(digit, 10) : parseInt(digit, 10) * 2))
        .map((digit) => (digit > 9 ? digit - 9 : digit))
        .reduce((acc, digit) => acc + digit, 0) % 10;

      const generatedCardNumber = randomCardNumber + (luhnCheckDigit === 0 ? 0 : 10 - luhnCheckDigit);
      const generatedCVV = generateCVV ? generateCVVNumber() : '';
      const generatedExpiry = generateExpiry ? generateExpiryDate() : '';

      generatedDetails.push({
        cardNumber: generatedCardNumber,
        cardType: selectedCardType,
        cvv: generatedCVV,
        expiry: generatedExpiry,
      });
    }
    setCardDetails(generatedDetails);
  };

  return (
    <div class="max-w-2xl mx-auto bg-white p-8 my-10 rounded-md shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Credit Card Information Generator</h2>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="numToGenerate">
          Number of Credit Card Numbers to Generate
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="numToGenerate"
          type="number"
          min="1"
          value={numToGenerate}
          onInput={(e) => setNumToGenerate(parseInt(e.target.value, 10))}
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="cardType">
          Card Type
        </label>
        <select
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="cardType"
          value={selectedCardType}
          onChange={(e) => setSelectedCardType(e.target.value)}
        >
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="AmericanExpress">American Express</option>
          {/* Add more card types as needed */}
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Options
        </label>
        <div class="flex items-center mb-2">
          <input
            class="mr-2 leading-tight"
            id="generateCVV"
            type="checkbox"
            checked={generateCVV}
            onChange={() => setGenerateCVV(!generateCVV)}
          />
          <span class="text-sm text-gray-600">Generate CVV</span>
        </div>
        <div class="flex items-center">
          <input
            class="mr-2 leading-tight"
            id="generateExpiry"
            type="checkbox"
            checked={generateExpiry}
            onChange={() => setGenerateExpiry(!generateExpiry)}
          />
          <span class="text-sm text-gray-600">Generate Expiry Date</span>
        </div>
      </div>

      <div class="mb-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={generateCreditCardDetails}
        >
          Generate Credit Card Details
        </button>
      </div>

      {cardDetails.length > 0 && (
        <div class="mb-4">
          <h3 class="text-xl font-semibold mb-2">Generated Credit Card Details</h3>
          <table class="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th class="border border-gray-300 py-2 px-4">Card Number</th>
                <th class="border border-gray-300 py-2 px-4">Card Type</th>
                {generateCVV && <th class="border border-gray-300 py-2 px-4">CVV</th>}
                {generateExpiry && <th class="border border-gray-300 py-2 px-4">Expiry Date</th>}
              </tr>
            </thead>
            <tbody>
              {cardDetails.map((details, index) => (
                <tr key={index}>
                  <td class="border border-gray-300 py-2 px-4">{details.cardNumber}</td>
                  <td class="border border-gray-300 py-2 px-4">{details.cardType}</td>
                  {generateCVV && <td class="border border-gray-300 py-2 px-4">{details.cvv}</td>}
                  {generateExpiry && <td class="border border-gray-300 py-2 px-4">{details.expiry}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CreditCardForm;
