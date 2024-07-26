package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Comment;

import java.util.List;

public interface CommentService {
    Comment createComment(Comment comment);

    Comment getCommentById(Long id);

    List<Comment> getCommentsByPost(Long postId);
}
