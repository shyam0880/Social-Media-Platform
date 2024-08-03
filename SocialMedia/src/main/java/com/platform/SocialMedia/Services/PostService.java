package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.dto.PostDTO;

import java.util.List;

public interface PostService {
    Post createPost(Post post);

    List<Post> getAllPosts();

    List<PostDTO> findAllPosts();
}
