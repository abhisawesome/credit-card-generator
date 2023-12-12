import { useState } from "preact/hooks";
import CardSelector from "./CardSelector";
import {
  generateCVV as randomGenerateCVV,
  generateExpiryDate as randomGenerateDate,
  generateCardNumber,
} from "../../utils";
import data from "../../data/data.json";

const CreditCardGenerator = () => {
  const [cardDetails, setCardDetails] = useState([]);
  const [numToGenerate, setNumToGenerate] = useState(5); // Default number to generate
  const [generateCVV, setGenerateCVV] = useState(false);
  const [generateExpiry, setGenerateExpiry] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState("Mastercard");

  const generateRandomNumber = (start, end) => {
    const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
    return randomNumber.toString();
  };

  const generateCVVNumber = () => {
    return randomGenerateCVV();
  };

  const generateExpiryDate = () => {
    return randomGenerateDate();
  };

  const generateCreditCardDetails = () => {
    const currentCardDetails = data?.find(
      (item) => item?.issuing_network === selectedCardType
    );
    const prefix =
      currentCardDetails?.iin_bin_ranges[
        generateRandomNumber(0, currentCardDetails?.iin_bin_ranges?.length - 1)
      ];
    const range =
      currentCardDetails?.length[
        generateRandomNumber(0, currentCardDetails?.length?.length - 1)
      ];
    const generatedDetails = generateCardNumber(prefix, range,numToGenerate);
    console.log(generatedDetails)
    setCardDetails(
      generatedDetails?.map((item) => {
        const generatedCVV = generateCVV ? generateCVVNumber() : "";
        const generatedExpiry = generateExpiry ? generateExpiryDate() : "";
        return {
          cardNumber: item,
          cvv: generatedCVV,
          expiry: generatedExpiry,
        };
      })
    );
  };

  return (
    <div class="max-w-2xl mx-auto bg-white p-8 my-10 rounded-md shadow-md">
      <h2 class="text-2xl font-semibold mb-4">
        Credit Card Information Generator
      </h2>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="numToGenerate"
        >
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
        <CardSelector
          selectedCardType={selectedCardType}
          setSelectedCardType={setSelectedCardType}
        />
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
          <h3 class="text-xl font-semibold mb-2">
            Generated Credit Card Details
          </h3>
          <table class="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th class="border border-gray-300 py-2 px-4">Card Number</th>
                {generateCVV && (
                  <th class="border border-gray-300 py-2 px-4">CVV</th>
                )}
                {generateExpiry && (
                  <th class="border border-gray-300 py-2 px-4">Expiry Date</th>
                )}
              </tr>
            </thead>
            <tbody>
              {cardDetails.map((details, index) => (
                <tr key={index}>
                  <td class="border border-gray-300 py-2 px-4">
                    {details.cardNumber}
                  </td>
                  {generateCVV && (
                    <td class="border border-gray-300 py-2 px-4">
                      {details.cvv}
                    </td>
                  )}
                  {generateExpiry && (
                    <td class="border border-gray-300 py-2 px-4">
                      {details.expiry}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CreditCardGenerator;
