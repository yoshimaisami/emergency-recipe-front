import React, { Component } from "react";
import "./RecipeFormView.css";
import IngredientChips from './IngredientChips';
import { Row, Col, Card, Input, Button } from "react-materialize";

const API_URL = "https://emergency-recipe-backend.herokuapp.com/api/recipe";

class RecipeFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      keyIngredients: [],
      servings: "",
      prepTime: "",
      picture: "",
      instructions: "",
      isApproved: true,
      comments: []
    }
    

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.tokenizeStringIntoArray = this.tokenizeStringIntoArray.bind(this);
    this.uppercaseFirstLetterArray = this.uppercaseFirstLetterArray.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    const target = e.target;
    let value = target.value;
    const name = target.name;
    if (name === "keyIngredients") {
      let tokenizedArray = this.tokenizeStringIntoArray(value);
      tokenizedArray = this.uppercaseFirstLetterArray(tokenizedArray);
      value = tokenizedArray;
    }
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  tokenizeStringIntoArray(stringToBeTokenized){
    let tokenArray = stringToBeTokenized.match(/\S+/g);
    console.log("Token array: ", tokenArray);
    return tokenArray;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit called", this.state);
    fetch(API_URL, { 
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(this.state.recipe),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log("Message from API: ", res);
    })
    .catch(err => {
      console.log("Error: ", err);
    })
  }

  uppercaseFirstLetterArray(arrayArg) {
    let fixedArray = [];

    if (arrayArg !== null) {
      for (let i = 0; i < arrayArg.length; i++) {
        let currentWord = arrayArg[i];
        fixedArray.push(currentWord.charAt(0).toUpperCase() + currentWord.slice(1));
      }
      return fixedArray;
    } else {
      return arrayArg;
    }
  }

  render() {
    return (
      <div>
        <Row className="submission-form-container">
          <Col l={12} m={12} s={12}>
            <Card
              className="submission-form-box"
              textClassName="white-text"
              title="Share your recipe with the world!"
              actions={[
                <Button
                  waves="light"
                  className="pink"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              ]}
            >
              <Row className="recipe-form-view-inputs">
                <Input
                  s={12}
                  m={12}
                  l={12}
                  label="Name of Recipe"
                  name="title"
                  // value={this.state.recipe.title}
                  onChange={this.handleInputChange}
                />

                <Input
                  s={12}
                  m={6}
                  l={6}
                  label="Prep Time"
                  name="prepTime"
                  // value={this.state.recipe.prepTime}
                  onChange={this.handleInputChange}
                />

                <Input
                  s={12}
                  m={6}
                  l={6}
                  label="Servings"
                  name="servings"
                  // value={this.state.recipe.servings}
                  onChange={this.handleInputChange}
                />
              </Row>

              <Row className="recipe-form-view-inputs">
                <Input
                  s={12}
                  m={12}
                  l={12}
                  label="Image URL"
                  name="picture"
                  // value={this.state.recipe.picture}
                  onChange={this.handleInputChange}
                />
              </Row>

              <Row className="recipe-form-view-inputs">
                <Input
                  s={12}
                  m={12}
                  l={12}
                  type="textarea"
                  label="Instructions"
                  name="instructions"
                  // value={this.state.recipe.instructions}
                  onChange={this.handleInputChange}
                />
              </Row>

              <IngredientChips ingredients={this.state.keyIngredients} />

              <Row className="recipe-form-view-inputs">
                <Input
                  s={12}
                  m={12}
                  l={12}
                  label="Key Ingredient Tags"
                  name="keyIngredients"
                  onChange={this.handleInputChange}
                />
              </Row>
            </Card>
          </Col>
        </Row>

        {/* <div className="outer-form-div" s={12}>
          

          <Row>
            <Input
              type="textarea"
              placeholder="Please seperate each step with a comma"
              s={12}
              label="Key Ingredients"
            />
          </Row>

          <Row>
            <Input
              type="textarea"
              placeholder="Please seperate each step with a comma"
              s={12}
              label="Directions"
            />
          </Row>

          <div>
            <Button waves="light" node="a" href="http://www.google.com">
              {" "}
              Submit{" "}
            </Button>
          </div>
        </div> */}
      </div>
    );
  }
}

export default RecipeFormView;
