import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AddFeedback from "./AddFeedback";
import EditFeedback from "./EditFeedback";
import { StarTwoTone } from '@ant-design/icons';
import { AuthContext } from './../context/auth.context'


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function FeedbackList(props) {
const [myRecipes, setMyRecipes] = useState([]);
let [feedback, setFeedback] = useState([]);
const [displayForm, setDisplayForm] = useState(false);
const [feedbackEditForm, setFeedbackEditForm] = useState(false);
const { recipeId, storedToken, userId } = props;
const { user } = useContext(AuthContext);

const getFeedback = () => {
axios
    .get(`${API_URL}/api/recipes/${recipeId}`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
        setFeedback(response.data.feedback);
        setDisplayForm(false);
        setFeedbackEditForm(false);
    })
    .catch((error) => console.log(error))
};

const reversedFeedback = [...feedback].reverse();
const myFeedback = reversedFeedback.filter(comment => comment.author._id === userId);
const myFeedbackIds = myFeedback.map(entry => entry._id);


useEffect(() => {
    getFeedback();
}, [] );



function deleteFeedback(feedbackId) {
    axios
    .delete(`${API_URL}/api/feedback/${feedbackId}`,
    { headers: { Authorization: `Bearer ${storedToken}` } } 
    )
    .then(() => {
        getFeedback()
    })
    .catch((err) => console.log(err));
}


const getMyRecipes = () => {
    const storedToken = localStorage.getItem("authToken");
  
    axios
  .get(`${API_URL}/api/recipes/user/${user._id}`,
  { headers: { Authorization: `Bearer ${storedToken}` } })
  .then((response) => {
    setMyRecipes(response.data);
    })
      .catch((error) => console.log(error));
  };
  
  useEffect(() => {
    getMyRecipes();
  },  [] );

return (
    <div>

        {!(myRecipes.map((recipe)=> recipe._id)).includes(recipeId) ? (

        <div>
            <button onClick={()=> setDisplayForm(!displayForm)} id='showFormToggle'>{displayForm ? 'Close Form' : 'Share your feedback about this recipe'}</button>
            {displayForm && <AddFeedback refreshFeedback={getFeedback} recipeId={recipeId} />}
        </div>

        ) : null}

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
                    ? <div>
                        <button onClick={()=>deleteFeedback(feedback._id) } style={{background:'red'}}>Delete my comment</button>
                        <button onClick={()=> setFeedbackEditForm(!feedbackEditForm)} id='showFormToggle' style={{background:'orange'}}>{feedbackEditForm ? 'Save' : 'Edit your feedback'}</button>
                        {feedbackEditForm && <EditFeedback refreshFeedback={getFeedback} feedbackId={feedback._id} feedbackScore={feedback.score} feedbackComment={feedback.comment} />}
                    </div>
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