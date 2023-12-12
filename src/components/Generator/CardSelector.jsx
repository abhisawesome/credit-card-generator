import data from "../../data/data.json";
const RenderOptions = () => {
  return data?.map((item) => (
    <option value={item?.issuing_network}>{item?.issuing_network}</option>
  ));
};
const CardSelector = ({ selectedCardType, setSelectedCardType = () => {} }) => {
  return (
    <>
      <label class="block text-gray-700 text-sm font-bold mb-2" for="cardType">
        Card Type
      </label>
      <select
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="cardType"
        value={selectedCardType}
        onChange={(e) => setSelectedCardType(e.target.value)}
      >
        <RenderOptions />
      </select>
    </>
  );
};

export default CardSelector;
