package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Post;

import java.util.List;

public interface PostService {
    Post createPost(Post post);

    Post getPostById(Long id);

    List<Post> getAllPosts();

    List<Post> getPostsByUser(Long userId);

    List<Post> getNewsfeed(Long userId);
}
