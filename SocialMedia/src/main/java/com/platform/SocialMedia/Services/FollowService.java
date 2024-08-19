package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.dto.FollowDTO;

public interface FollowService {
    void followUser(FollowDTO followDTO);
    void unfollowUser(FollowDTO followDTO);
    boolean isFollowing(Long userId, Long followerId);
}
