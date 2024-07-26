package com.platform.SocialMedia.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Table(name = "likes")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="post_id",nullable = false)
    private Post post;
}
