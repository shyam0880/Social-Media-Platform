package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.Entity.User;
import com.platform.SocialMedia.Repository.PostRepository;
import com.platform.SocialMedia.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImplementation implements PostService{

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post getPostById(Long id) {
        return postRepository.findById(id).orElseThrow(RuntimeException::new);
        //return postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> getPostsByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(RuntimeException::new);
        //User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        return postRepository.findByAuthor(user);
    }

    @Override
    public List<Post> getNewsfeed(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(RuntimeException::new);
       //User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        List<User> followedUsers = user.getFollowing();
        return postRepository.findByAuthorIn(followedUsers);
    }
}
