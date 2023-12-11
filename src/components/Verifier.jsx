// CreditCardVerification.js
import { h } from 'preact';
import { useState } from 'preact/hooks';

const CreditCardVerification = () => {
  const [creditCardNumber, setCreditCardNumber] = useState('');

  const handleVerify = () => {
    // Implement your credit card verification logic here
    // You might want to communicate with a server to perform the verification
    // For simplicity, let's just log the credit card number to the console
    console.log(`Verifying credit card number: ${creditCardNumber}`);
  };

  return (
    <div class="max-w-md mx-auto bg-white p-8 my-10 rounded-md shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Credit Card Verification</h2>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="creditCardNumber">
          Credit Card Number
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="creditCardNumber"
          type="text"
          placeholder="Enter credit card number"
          value={creditCardNumber}
          onInput={(e) => setCreditCardNumber(e.target.value)}
        />
      </div>

      <div class="mb-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleVerify}
        >
          Verify Credit Card
        </button>
      </div>
    </div>
  );
};

export default CreditCardVerification;
