import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Row } from 'antd';
import axios from "axios";
import FeedbackCard from "./FeedbackCard";
import AddFeedback from "./AddFeedback";
import { StarTwoTone } from '@ant-design/icons';


const API_URL = "http://localhost:5005";

function FeedbackList(props) {
let [feedback, setFeedback] = useState([]);
const [displayForm, setDisplayForm] = useState(false);
const { recipeId, storedToken } = props;

const getFeedback = () => {
axios
    .get(`${API_URL}/api/recipes/${recipeId}`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
        setFeedback(response.data.feedback);
        setDisplayForm(false);
        console.log("the response.data.feedback is ", response.data.feedback);
    })
    .catch((error) => console.log(error))
};

// const displayedFeedback = feedback;
const reversedFeedback = [...feedback].reverse();

useEffect(() => {
    getFeedback();
}, [] );

return (
    <div>
        <div>
            <button onClick={()=> setDisplayForm(!displayForm)} id='showFormToggle'>{displayForm ? 'Close Form' : 'Share your feedback about this recipe'}</button>
            {displayForm && <AddFeedback refreshFeedback={getFeedback} recipeId={recipeId} />}
        </div>
         <div className="FeedbackList">
          <ul>
            { reversedFeedback.map((feedback) => 
            <li key={feedback.id}>
                <div className="stars">
                    {[...Array(feedback.score)].map((i) => (
                        <StarTwoTone twoToneColor="#FFDE33" key={i} />
                        )
                    )}
                </div>
                <p><b>{feedback?.author?.name ? `${feedback.author.name} says:` : ''}</b></p>  
                <p>{feedback.comment}</p>
            </li>
           ) }
          </ul>
         </div>
    </div>
)

}

export default FeedbackList;