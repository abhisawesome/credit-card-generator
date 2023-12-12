import { useState } from "preact/hooks";
import { verifyCardNumber } from "../utils";
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const CreditCardVerification = () => {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleVerify = () => {
    const isValid = verifyCardNumber(creditCardNumber);
    setValidationMessage(isValid ? "Valid" : "Invalid");
  };

  return (
    <div class="max-w-md mx-auto bg-white p-8 my-10 rounded-md shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Credit Card Verification</h2>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="creditCardNumber"
        >
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

      {validationMessage && (
        <div className="flex items-center">
          <div
            class={`text-lg ${
              validationMessage === "Valid" ? "text-green-500" : "text-red-500"
            }`}
          >
            {validationMessage}
          </div>
          {validationMessage === "Valid" && (
            <CheckBadgeIcon className="ml-1 h-6 w-6" aria-hidden="true" />
          )}
          {validationMessage !== "Valid" && (
            <ExclamationTriangleIcon
              className="ml-1 h-6 w-6"
              aria-hidden="true"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CreditCardVerification;
