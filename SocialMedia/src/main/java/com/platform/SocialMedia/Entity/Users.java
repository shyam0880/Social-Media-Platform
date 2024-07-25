package com.platform.SocialMedia.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Getter
@Setter
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String firstName;
    private String lastName;
    private String role;
    private String gender;
    private String profileURL;
    private String bio;
    private Data date;

    @OneToMany(mappedBy = "User")
    private List<Post> posts;

    @ManyToMany
    private List<User> following;

    @ManyToMany
    private List<User> followers;
}
