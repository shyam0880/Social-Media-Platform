package com.platform.SocialMedia.dto;

import com.platform.SocialMedia.Entity.Post;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data

public class UserDTO {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String gender;
    private String profileURL;
    private String bio;
    private Date date;
    private List<Post> posts;
    private List<UserDTO> followers;
    private List<UserDTO> following;
}
