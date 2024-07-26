package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Like;

import java.util.List;

public interface LikeService {
    Like likePost(Like like);

    void unlikePost(Like like);

    List<Like> getLikesByPost(Long postId);
}
