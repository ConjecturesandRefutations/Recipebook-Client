import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Row } from 'antd';
import axios from "axios";
import FeedbackCard from "./FeedbackCard";
import AddFeedback from "./AddFeedback";

import { useContext } from 'react'; 

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
        const recipeFeedback = response.data.feedback;
        setFeedback(recipeFeedback);
        console.log(feedback);
    })
    .catch((error) => console.log(error))
};

const displayedFeedback = feedback;

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
         {/* <Row style={{ width: '100%', justifyContent: 'center' }}>
            { displayedFeedback.map((feedback) => <FeedbackCard key={feedback._id} {...feedback} />  )}
         </Row> */}
         <ul>
         { displayedFeedback.map((feedback) => 
         <li key={feedback._id}><FeedbackCard comment={feedback.comment} score={feedback.score} author={feedback.author} /></li>
         ) }
         </ul>
         </div>
    </div>
)

}

export default FeedbackList;