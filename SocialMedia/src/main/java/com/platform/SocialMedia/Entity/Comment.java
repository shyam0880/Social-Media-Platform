package com.platform.SocialMedia.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Table(name = "comments")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Data createDate;

    @ManyToOne
    @JoinColumn(name="author_id",nullable = false)
    private User author;

    @ManyToOne
    @JoinColumn(name="post_id",nullable = false)
    private Post post;
}
