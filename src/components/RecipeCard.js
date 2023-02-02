import { Link } from "react-router-dom";
import { Card, Col } from 'antd';

function RecipeCard ( { name, imgUrl, _id } ) {

  return (
    <div className="RecipeCard">
      <Col id='table'>
      <Link to={`/recipes/${_id}`}>
        <Card id="recipeCard">
        <h3>{name}</h3>
        <img src={imgUrl} alt="recipe" height={200} id='recipePic'/>
      </Card>
      </Link>
      </Col>
    </div>
  );
}

export default RecipeCard;