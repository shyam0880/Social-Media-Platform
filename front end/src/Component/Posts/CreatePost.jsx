import React, { useState} from 'react';
import axios from 'axios';
//import { UserContext } from '../../UserContext'; // Adjust the path as needed
import './CreatePost.css'; // Import the CSS file for styling

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  //const { user } = useContext(UserContext); // Access the current user from context
  const user = { id: 3 }; //temperory only access if user id present

  const handleCreatePost = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      setMessage('You must be logged in to create a post.');
      return;
    }

    const post = {
      content,
      createDate: new Date().toISOString(), // Current date in ISO format
      //author: user.id // Assuming `user.id` is the ID of the current user
      author: { id: user.id } // Use the fixed user ID
    };

    try {
        const response = await axios.post('http://localhost:8080/api/post/createpost', post);
        setMessage('Post created successfully!');
        setContent('');
        console.log(response.data); // Handle the response data if needed
      } catch (error) {
        setMessage('Failed to create post.');
        console.error(error); // Log the error for debugging
      }
  };

  return (
    <div className="create-post-container">
      <h1>Create a New Post</h1>
      <form onSubmit={handleCreatePost} className="create-post-form">
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="create-post-button">Create Post</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreatePost;
