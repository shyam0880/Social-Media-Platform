package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Post;
//import com.platform.SocialMedia.Entity.User;
import com.platform.SocialMedia.Repository.PostRepository;
import com.platform.SocialMedia.Repository.UserRepository;
import com.platform.SocialMedia.dto.PostDTO;
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
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }


    @Override
    public List<PostDTO> findAllPosts() {
        return postRepository.findAllPosts();
    }

}
