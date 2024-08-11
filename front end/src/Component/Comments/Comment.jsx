import React,{ useContext, useState} from 'react'
import { UserContext } from '../../UserContext';
import axios from 'axios';

import './Commentcss.css'



const Comment =({postid})=> {
  const [content, setContent] = useState();
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext);

  const handleCreateComment = async(e) =>{
    e.preventDefault();

    if (!content || content.trim() === '') {
      setMessage('Comment cannot be empty.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }

    const comment = {
      content : content.trim(),
      createDate: new Date().toISOString(),
      author: { id: user.id },
      post: {id : postid}
    }

    setTimeout(() => {
      setMessage('');
    }, 3000);

    try{
      await axios.post('http://localhost:8080/api/comments/createcomment', comment);
      setMessage('comment created successfully!');
      setContent('');
    } catch(error){
      setMessage('Failed to create comment.');
      console.error(error);
    }
  }



  return (
    <div>
        <div className="comment">
          <input type="text"
          value={content}
          onChange={(e)=>setContent(e.target.value)} 
          placeholder="Write a comment"
          required
          />
          <input type="button"
          value="Comment"
          onClick={handleCreateComment} />
        </div>
        {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Comment
