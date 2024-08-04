package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Comment;
import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.Repository.CommentRepository;
import com.platform.SocialMedia.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImplementation implements CommentService{

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Comment getCommentById(Long id) {
        //return commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException(id));
        return commentRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @Override
    public List<Comment> getCommentsByPost(Long postId) {
        //Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId));
        //Post post = postRepository.findById(postId).orElseThrow(RuntimeException::new);
        //return commentRepository.findByPostId(post);
        return commentRepository.findByPostId(postId);
    }
}
