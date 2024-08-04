package com.platform.SocialMedia.Controller;

import com.platform.SocialMedia.Entity.Like;
import com.platform.SocialMedia.Services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/like")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping
    public ResponseEntity<Like> likePost(@RequestBody Like like) {
        Like createdLike = likeService.likePost(like);
        return ResponseEntity.ok(createdLike);
    }

    @DeleteMapping
    public ResponseEntity<Void> unlikePost(@RequestBody Like like) {
        likeService.unlikePost(like);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<Object> getLikesByPost(@PathVariable Long postId) {
        List<Like> likes = likeService.getLikesByPost(postId);
        return ResponseEntity.ok(likes);
    }
}
