import { useState } from "react";
import axios from "axios";
import { Input } from 'antd';
import { Select } from 'antd';

const { Option } = Select;
const API_URL = "http://localhost:5005";


function AddFeedback(props) {
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState("");
    const { TextArea } = Input
    const { refreshFeedback, recipeId } = props

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { score, comment };
        const storedToken = localStorage.getItem('authToken');

        axios
        .post (`${API_URL}/api/recipes/${recipeId}/feedback`, requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {
            console.log(response);
            setScore(0);
            setComment("");
            refreshFeedback();
        })
        .catch((error) => console.log(error));
    };

    return (
        <div className="AddFeedback">
            <form onSubmit={handleSubmit}>
                <h4>Leave a comment!</h4>
                <br/>
                <label>Score:</label>
                <Select value={score} onChange={(value) => setScore(Number(value)) } style={{ width: 400 }}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                </Select>
                <br/>
                <label>Your comment:</label>
                <TextArea type="text" name="your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <br/>
                <button type="submit" id="submitFeedback">Submit</button>
            </form>
        </div>
    )
}

export default AddFeedback;