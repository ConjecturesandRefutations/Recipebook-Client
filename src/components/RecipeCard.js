import { Link } from "react-router-dom";
import { Card, Col } from 'antd';

// We are deconstructing props object directly in the parentheses of the function
function RecipeCard ( { name, instructions, _id } ) {

  return (
    <div className="RecipeCard">
      <Col id='table'>
      <Link to={`/recipes/${_id}`}>
        <Card id="recipeCard">
        <h3>{name}</h3>
      <p>{instructions} </p>
      </Card>
      </Link>
      </Col>
    </div>
  );
}

export default RecipeCard;