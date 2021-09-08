import {useState} from 'react';
import './Feedback.scss';

interface FeedbackProps {
    message: string
}

const Feedback: React.FC<FeedbackProps> = ({message}) => {
 const [show, setShow] = useState(true)
 if(!show) {
     return null;
 } 
 return (
  <div className="feedback-container">
      <div>{message} </div>
      <button className="feedback-button"onClick={()=> setShow(false)}>OK</button>
  </div>)
}

export default Feedback;