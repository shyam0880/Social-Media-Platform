package com.platform.SocialMedia.Repository;


import com.platform.SocialMedia.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

}
