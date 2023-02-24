import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 
import { AuthContext } from "./../context/auth.context";
import { Button } from 'antd';
import React from "react";
import { Link } from "react-router-dom";

import cutlery from '../images/cutlerynoback.png'

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
    let speed = 2;
  
    const image = new Image();
    image.src = cutlery;
  
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
        <Link to={"/recipes/user/:userId"}><Button className='homeButtons'>Profile Page</Button></Link>
        <Link to={"/recipes/"}><Button className='homeButtons'>All Recipes</Button></Link>
        <Link to={"/recipes/random"}><Button className='homeButtons'>Need Inspiration?</Button></Link>
        <br/>
        <br/>
        <canvas id='canvas' height={250}></canvas>
      </div>
    );
  }
  
  export default HomePage;