package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Comment;
import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.Entity.User;
import com.platform.SocialMedia.Repository.PostRepository;
import com.platform.SocialMedia.Repository.UserRepository;
import com.platform.SocialMedia.dto.CommentDTO;
import com.platform.SocialMedia.dto.PostDTO;
import com.platform.SocialMedia.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImplementation implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;


    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
        //return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }


    @Override
    public UserDTO getUsersById(Long id) {
        User user = userRepository.findById(id).orElseThrow(RuntimeException::new);
        return convertToDTO(user);
        //return userRepository.findById(id).orElseThrow(RuntimeException::new);
        //return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<UserDTO> findAllUsers() {
        List<User> user = userRepository.findAll();
        return user.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public void followUser(Long userId, User follower) {
        User user = getUserById(userId); // Retrieve the User object
        user.getFollowers().add(follower); // Add the follower to the list
        userRepository.save(user); // Save the updated User object
    }

    @Override
    public boolean validateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        String db_password= user.getPassword();
        return password.equals(db_password);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    @Override
    public UserDTO findsByEmail(String email) {
        User user =  userRepository.findByEmail(email);
        return convertToDTO(user);
    }


    private UserDTO convertToDTO(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setRole(user.getRole());
        userDTO.setGender(user.getGender());
        userDTO.setProfileURL(user.getProfileURL());
        userDTO.setBio(user.getBio());
        userDTO.setDate(user.getDate());
        userDTO.setPosts(user.getPosts().stream().map(this::convertToDTO).collect(Collectors.toList()));
        return userDTO;
    }

    private PostDTO convertToDTO(Post post){
        PostDTO postDTO = new PostDTO();
        postDTO.setId(post.getId());
        postDTO.setContent(post.getContent());
        postDTO.setCreateDate(post.getCreateDate());
        postDTO.setAuthorId(post.getAuthor().getId());
        postDTO.setFullName(post.getAuthor().getFirstName()+" "+post.getAuthor().getLastName());
        postDTO.setComment(post.getComments().stream().map(this::convertToDTO).collect(Collectors.toList()));
        return postDTO;
    }

    private CommentDTO convertToDTO(Comment comment){
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setContent(comment.getContent());
        commentDTO.setPostId(comment.getPost().getId());
        commentDTO.setAuthorId(comment.getAuthor().getId());
        return commentDTO;

    }
}
