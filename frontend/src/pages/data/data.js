// let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }

export const DairyOptions = [
  { value: "egg", label: "Egg" },
  { value: "butter", label: "Butter" },
];

export const VegetableOptions = [
  { value: "cabbage", label: "Cabbage" },
  { value: "onion", label: "Onion" },
  { value: "tomato", label: "Tomato" },
  { value: "andy", label: "Andy" },
];

export const groupedIngredients = [
  {
    label: "Dairy",
    options: DairyOptions,
  },
  {
    label: "Vegetables",
    options: VegetableOptions,
  },
];
