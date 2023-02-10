import { Card } from 'antd';
import { StarTwoTone } from '@ant-design/icons'

function FeedbackCard ( { comment, score, author } ) {
    <Card id="feedbackCard">
        {[...Array(score)].map((i) => (
            <StarTwoTone twoToneColor="#FFDE33" key={i} />
            )
        )}
        <p>{author} says:</p>
        <br/>
        <p>{comment}</p>
    </Card>
}

export default FeedbackCard;