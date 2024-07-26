package com.platform.SocialMedia.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Table(name = "follows")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="follower_id",nullable = false)
    private User follower;

    @ManyToOne
    @JoinColumn(name = "followee_id", nullable = false)
    private User followee;
}
