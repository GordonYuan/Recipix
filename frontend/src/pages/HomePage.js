import React from "react";
import Select from "react-select";
import { colourOptions, groupedOptions } from "./data/data";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const recipes = [
  { id: 1, title: "Pancakes", imagePath: "pancake.png" },
  { id: 2, title: "Pancakes", imagePath: "pancake.png" },
  { id: 3, title: "Pancakes", imagePath: "pancake.png" },
  { id: 4, title: "Pancakes", imagePath: "pancake.png" },
];

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        {/* {recipes.map((recipe) => (
        <RecipeCard title={recipe.title} imagePath={recipe.imagePath} />
      ))} */}
        <Select
          defaultValue={colourOptions[1]}
          options={groupedOptions}
          formatGroupLabel={formatGroupLabel}
          isMulti
        />
      </div>
    );
  }
}
export default HomePage;
