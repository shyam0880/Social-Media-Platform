package com.platform.SocialMedia.Repository;

import com.platform.SocialMedia.Entity.Like;
import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByPost(Post post);
    List<Like> findByUser(User user);
}
