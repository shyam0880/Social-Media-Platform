package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Comment;
import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.Repository.CommentRepository;
import com.platform.SocialMedia.Repository.PostRepository;
import com.platform.SocialMedia.dto.CommentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        return commentRepository.findByPostId(postId);
    }

    @Override
    public List<CommentDTO> getCommentsByPostDTO(Long postId) {
        List<Comment> comment = commentRepository.findByPostId(postId);
        return comment.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private CommentDTO convertToDTO(Comment comment){
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setContent(comment.getContent());
        commentDTO.setPostId(comment.getPost().getId());
        commentDTO.setAuthorId(comment.getPost().getId());
        return commentDTO;

    }
}
