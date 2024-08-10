package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Comment;
import com.platform.SocialMedia.dto.CommentDTO;

import java.util.List;

public interface CommentService {
    Comment createComment(Comment comment);

    Comment getCommentById(Long id);

    List<Comment> getCommentsByPost(Long postId);

    List<CommentDTO> getCommentsByPostDTO(Long postId);
}
