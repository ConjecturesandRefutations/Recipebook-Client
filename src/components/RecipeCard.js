import { Link } from "react-router-dom";
import { Card, Col } from 'antd';




function RecipeCard ( { name, imgUrl, _id } ) {

  return (
    <div>
      <Col id='table' style={{ padding: 0 }}>
      <Link to={`/recipes/${_id}`}>
        <Card className="recipeCard" >
        <h3 className="recipeName">{name}</h3>
        <img src={imgUrl} alt="recipe" className='recipePic'/>
      </Card>
      </Link>
      </Col>
      </div>
  );
}

export default RecipeCard;