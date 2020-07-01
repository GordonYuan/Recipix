// let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }

export const DairyOptions = [
  { value: "eggs", label: "Eggs", category: "Dairy" },
  { value: "butter", label: "Butter", category: "Dairy" },
];

export const VegetableOptions = [
  { value: "cabbage", label: "Cabbage", category: "Vegetables" },
  { value: "onion", label: "Onion", category: "Vegetables" },
  { value: "tomato", label: "Tomato", category: "Vegetables" },
  { value: "celery", label: "Celery", category: "Vegetables" },
  { value: "lettuce", label: "Lettuce", category: "Vegetables" },
];

export const MeatOptions = [
  { value: "ham", label: "Ham", category: "Meats" },
  { value: "salami", label: "Salami", category: "Meats" },
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
  {
    label: "Meats",
    options: MeatOptions,
  },
];
