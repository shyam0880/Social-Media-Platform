package com.platform.SocialMedia.Repository;

import com.platform.SocialMedia.Entity.Comment;
import com.platform.SocialMedia.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
}
