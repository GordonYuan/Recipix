import React from "react";

const Recipe = ({ match }) => {
  return (
    <div>
      <p>{match.params.id}</p>
    </div>
  );
};

export default Recipe;
