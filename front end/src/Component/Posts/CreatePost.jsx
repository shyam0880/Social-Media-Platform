import React, { useState, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext'; // Adjust the path as needed
import './CreatePost.css'; // Import the CSS file for styling

const CreatePost = ({refpost}) => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext); // Access the current user from context
  //const user = { id: 1 }; //temperory only access if user id present

  const handleCreatePost = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      setMessage('You must be logged in to create a post.');
      return;
    }

    const post = {
      content,
      createDate: new Date().toISOString(), 
      author: { id: user.id } // Use the fixed user ID
    };


    setTimeout(() => {
      setMessage('');
    }, 3000);


    try {
        const response = await axios.post('http://localhost:8080/api/post/createpost', post);
        setMessage('Post created successfully!');
        setContent('');
        refpost();
        console.log(response.data); // Handle the response data if needed
      } catch (error) {
        setMessage('Failed to create post.');
        console.error(error); // Log the error for debugging
      }
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleCreatePost} className="create-post-form">
        <div className="form-group">
          <div className="post-create">
            <div className='userimg'>
              <img src={user.profileURL} alt={user.fullName} />
            </div>
            <div className='area'>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>    
            </div>
          </div>
        </div>
        <div className='postsubmit'>
          <button type="submit" className="create-post-button">Create Post</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreatePost;
