package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);

    User getUserById(Long id);

    List<User> getAllUsers();

    void followUser(Long userId, User follower);
}
