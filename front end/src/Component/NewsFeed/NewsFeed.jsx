import React,{ useContext, useState} from 'react'
import { UserContext } from '../../UserContext';
import Comment from '../Comments/Comment';
import axios from 'axios';

const NewsFeed = ()=> {
  const {  users, posts } = useContext(UserContext);
  const [comments, setComments] = useState({});
  const [visible, setVisible] = useState(null);

  const fetchComment = async (postid) => {
    if(visible===postid){
      setVisible(null);
    }
    else{
      try {
        const response = await axios.get(`http://localhost:8080/api/comments/post/${postid}`);
        setComments(prevComments => ({ ...prevComments, [postid]: response.data }));
        setVisible(postid);
      } catch (error) {
        console.error(error);
      }

    }
  }

    const finduser=(userid)=>{
        const user = users.find(user => user.id === userid);
        return user.profileURL;
      }

  return (
    <div>
        {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            <ul className="post-list">
              {posts.map(post => (
                <li key={post.id} className="post">
                  <div className="postuser">
                    <div className='userimg'>
                      <img src={finduser(post.authorId)} alt={users.fullName} />
                    </div>
                    <div className='userbody'>
                      <p>{post.fullName}</p>
                      <small>Posted on: {new Date(post.createDate).toLocaleString()}</small>
                    </div>
                  </div>
                  <div className='content'>
                    <p>{post.content}</p>
                  </div>
                  <div className="buttons">
                    <div>
                      <button>Like</button>
                    </div>
                    <div>
                      <button className="comment"
                      onClick={() => fetchComment(post.id)}
                      >{visible === post.id ? 'Hide Comments' : 'Show Comments'}
                      </button>
                    </div>
                    <div>
                      <button className="share">Share</button>
                    </div>
                  </div>
                  <div className='commentList'>
                    {comments[post.id] && visible === post.id && ( // Conditionally render comments if they exist
                      <ul>
                        {comments[post.id].map(comment => (
                          <li key={comment.id}>
                            <div className='eachcomment'>
                              <div className='userimg'>
                                <img src={finduser(comment.authorId)} alt={users.fullName} />
                              </div>
                              <div>
                                <p>{comment.content}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                        )}
                  </div>
                  <div>
                    <Comment postid={post.id}/>
                  </div>
                </li>
              ))}
            </ul>
          )}
    </div>
  )
}


export default NewsFeed