import React from 'react'

const NewsFeed = ({posts , users})=> {

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
                    <button>Like</button>
                    <button className="comment">Comment</button>
                    <button className="share">Share</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
    </div>
  )
}


export default NewsFeed