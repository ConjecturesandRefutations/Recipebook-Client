import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 
import { AuthContext } from "./../context/auth.context";
import { Button } from 'antd';
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    const myCanvas = document.getElementById('canvas');
    const ctx = myCanvas.getContext('2d');


    let x = 0;
    let y = 0;
    let directionX = 1;
    let directionY = 1;
    let speed = 1.5;
  
    const image = new Image();
    image.src = 'https://th.bing.com/th/id/R.5e5b805247c9741ed413a65836705b8f?rik=1XfCwCncEBTLmg&pid=ImgRaw&r=0';
  
    image.onload = () => {
      function animate() {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.drawImage(image, x, y, 50, 50);
  
        x += directionX * speed;
        y += directionY * speed;
  
        if (x + 50 > myCanvas.width || x < 0) {
          directionX = -directionX;
        }
  
        if (y + 50 > myCanvas.height || y < 0) {
          directionY = -directionY;
        }
  
        requestAnimationFrame(animate);
      }
  
      animate();
    };
  }, []);

    return (
      <div className={'HomePage ' + theme}>
        <h1 id='title'>Recipebook</h1>
        <p id='welcome'>Hello {user && user.name}!</p>
        <Link to={"/recipes/user/:userId"}><Button className='profileButton'>Profile Page</Button></Link>
        <Link to={"/recipes/"}><Button className='recipesButton'>All Recipes</Button></Link>
        <Button className='randomButton'>Need Inspiration?</Button>
        <br/>
        <br/>
        <canvas id='canvas' height={250}></canvas>
      </div>
    );
  }
  
  export default HomePage;