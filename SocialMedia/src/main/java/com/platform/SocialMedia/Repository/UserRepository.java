package com.platform.SocialMedia.Repository;

import com.platform.SocialMedia.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    //User findByUsername(String username);
    User findByEmail(String email);
}
