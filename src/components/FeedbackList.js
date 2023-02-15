import { useState, useEffect } from "react";
import axios from "axios";
import AddFeedback from "./AddFeedback";
import { StarTwoTone } from '@ant-design/icons';


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

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
          <ul style={{listStyleType:'none'}}>
            { reversedFeedback.map((feedback) => 
            <li key={feedback.id}>
                <div><p><b className="feedback">{feedback?.author?.name ? `${feedback.author.name} commented:` : ''}</b></p></div>
                <div className="stars">
                    {[...Array(feedback.score)].map((i) => (
                        
                        <StarTwoTone twoToneColor="#FFDE33" key={i} />
                        )
                        
                    )}
                </div>
                <br/>
                <div>
                    <p className="feedback">{feedback.comment}</p>
                </div> 
            </li>
           ) }
          </ul>
         </div>
    </div>
)

}

export default FeedbackList;