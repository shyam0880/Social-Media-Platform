package com.platform.SocialMedia.Repository;

import com.platform.SocialMedia.Entity.Post;
//import com.platform.SocialMedia.Entity.User;
import com.platform.SocialMedia.dto.PostDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<PostDTO> findAllPosts();

}
