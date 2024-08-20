package com.platform.SocialMedia.Repository;

import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.Entity.User;
import com.platform.SocialMedia.dto.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    //User findByUsername(String username);
    User findByEmail(String email);

    boolean existsByEmail(String email);

}
