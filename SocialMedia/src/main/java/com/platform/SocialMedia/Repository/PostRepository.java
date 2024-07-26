package com.platform.SocialMedia.Repository;

import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthor(User author);
    List<Post> findByAuthorIn(List<User> authors);
}
