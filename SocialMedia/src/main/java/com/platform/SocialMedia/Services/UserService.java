package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.User;
import com.platform.SocialMedia.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);

    User getUserById(Long id);

    UserDTO getUsersById(Long id);

    List<User> getAllUsers();

    void followUser(Long userId, User follower);

    boolean validateUser(String email, String password);

    User findByEmail(String email);

    UserDTO findsByEmail(String email);

}
