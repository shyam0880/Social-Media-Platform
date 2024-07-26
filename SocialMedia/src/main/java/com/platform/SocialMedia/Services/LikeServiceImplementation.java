package com.platform.SocialMedia.Services;

import com.platform.SocialMedia.Entity.Like;
import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.Repository.LikeRepository;
import com.platform.SocialMedia.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImplementation implements LikeService{

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Like likePost(Like like) {
        return likeRepository.save(like);
    }

    @Override
    public void unlikePost(Like like) {
        likeRepository.delete(like);

    }

    @Override
    public List<Like> getLikesByPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(RuntimeException::new);
        //Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId));
        return likeRepository.findByPost(post);
    }
}
