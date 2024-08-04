package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.Entity.User;
import com.platform.SocialMedia.Repository.PostRepository;
import com.platform.SocialMedia.Repository.UserRepository;
import com.platform.SocialMedia.dto.PostDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<PostDTO> findAllPosts() {
        List<Post> posts = postRepository.findAllByOrderByCreateDateDesc();
        return posts.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private PostDTO convertToDTO(Post post){
        PostDTO postDTO = new PostDTO();
        postDTO.setId(post.getId());
        postDTO.setContent(post.getContent());
        postDTO.setCreateDate(post.getCreateDate());
        postDTO.setAuthorId(post.getAuthor().getId());
        postDTO.setFullName(post.getAuthor().getFirstName()+" "+post.getAuthor().getLastName());
        return postDTO;
    }

}
