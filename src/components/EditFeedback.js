import { useState, useContext } from "react";
import axios from "axios";
import { Input } from 'antd';
import { Select } from 'antd';

import { AuthContext } from './../context/auth.context'

const { Option } = Select;
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";



function EditFeedback(props) {
    const { refreshFeedback, feedbackId, feedbackScore, feedbackComment } = props;
    const [score, setScore] = useState(feedbackScore);
    const [comment, setComment] = useState(feedbackComment);
    const { user } = useContext(AuthContext);
    const { TextArea } = Input
    

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { score, comment, user };
        const storedToken = localStorage.getItem('authToken');

        axios
        .put(`${API_URL}/api/feedback/${feedbackId}/edit`, requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {
            refreshFeedback();
        })
        .catch((error) => console.log(error));
    };

    return (
        <div className="AddFeedback">
            <form onSubmit={handleSubmit}>
                <h4>Edit your feedback</h4>
                <br/>
                <label>Edit your Score:</label>
                <Select value={score} onChange={(value) => setScore(Number(value)) } style={{ width: 400 }}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                </Select>
                <br/>
                <label>Edit your Comment:</label>
                <TextArea type="text" name="your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <br/>
                <button type="submit" id="submitFeedback">Save</button>
            </form>
        </div>
    )
}

export default EditFeedback;