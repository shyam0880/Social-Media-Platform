package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.User;
import com.platform.SocialMedia.Repository.UserRepository;
import com.platform.SocialMedia.dto.FollowDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowServiceImplementation implements FollowService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public void followUser(FollowDTO followDTO) {
        User user = userRepository.findById(followDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        User follower = userRepository.findById(followDTO.getFollowerId()).orElseThrow(() -> new RuntimeException("Follower not found"));

        user.getFollowers().add(follower);
        userRepository.save(user);
    }

    @Override
    public void unfollowUser(FollowDTO followDTO) {
        User user = userRepository.findById(followDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        User follower = userRepository.findById(followDTO.getFollowerId()).orElseThrow(() -> new RuntimeException("Follower not found"));

        user.getFollowers().remove(follower);
        userRepository.save(user);
    }

    @Override
    public boolean isFollowing(Long userId, Long followerId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User follower = userRepository.findById(followerId).orElseThrow(() -> new RuntimeException("Follower not found"));

        return user.getFollowers().contains(follower);
    }
}
