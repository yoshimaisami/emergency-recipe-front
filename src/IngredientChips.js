import React, { Component } from "react";
import './IngredientChips.css';
import { Row, Col, Chip } from "react-materialize";

class IngredientChips extends Component {
  render() {
    let ChipItems;
    if (this.props.ingredients !== null){
      ChipItems = this.props.ingredients.map(ingredient => {
        return (
          <Chip>{ingredient}</Chip>
        );
      });
    }

    console.log("Ingredient props in Chips: ", this.props.ingredients);
    return (
      <div>
        <Row>
          {ChipItems}
        </Row>
      </div>
    );
  }
}

export default IngredientChips;