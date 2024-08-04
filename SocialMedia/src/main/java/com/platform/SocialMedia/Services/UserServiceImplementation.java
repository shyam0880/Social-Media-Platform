package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.User;
import com.platform.SocialMedia.Repository.PostRepository;
import com.platform.SocialMedia.Repository.UserRepository;
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
        return convertToTDO(user);
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
        return user.stream().map(this::convertToTDO).collect(Collectors.toList());
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
        return convertToTDO(user);
    }


    private UserDTO convertToTDO(User user){
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
        //userDTO.setPostsId(user.getPosts());
        return userDTO;
    }
}
