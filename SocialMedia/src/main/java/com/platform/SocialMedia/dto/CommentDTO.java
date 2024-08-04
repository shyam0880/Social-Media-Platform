package com.platform.SocialMedia.dto;

import lombok.Data;

@Data
public class CommentDTO {
    private Long id;
    private String content;
    private Long postId;
    private Long authorId;
}

