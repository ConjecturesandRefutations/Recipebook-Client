import { useState, useEffect } from "react";
import axios from "axios";
import AddFeedback from "./AddFeedback";
import { StarTwoTone } from '@ant-design/icons';


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function FeedbackList(props) {
let [feedback, setFeedback] = useState([]);
const [displayForm, setDisplayForm] = useState(false);
const { recipeId, storedToken, userId } = props;

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

const reversedFeedback = [...feedback].reverse();

const myFeedback = reversedFeedback.filter(comment => comment.author._id === userId)
console.log('mu feedback', myFeedback);
console.log('my userId', userId);

const myFeedbackIds = myFeedback.map(entry => entry._id);
console.log('my feedback ids', myFeedbackIds)


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
            <li key={feedback._id}>
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
                <br/>
                <div>
                    {(myFeedbackIds.includes(feedback._id))
                    ? <button>Delete my comment</button>
                    : null}
                </div>
            </li>
           ) }
          </ul>
          <br/>
         </div>
         <br/>
    </div>
)

}

export default FeedbackList;