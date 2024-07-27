package com.platform.SocialMedia.Controller;

import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/createpost")
    public ResponseEntity<Post> createPost(@RequestBody Post post){
        Post createdPost = postService.createPost(post);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/getallpost")
    public ResponseEntity<Object> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Object> getPostsByUser(@PathVariable Long userId) {
        List<Post> posts = postService.getPostsByUser(userId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/newsfeed/{userId}")
    public ResponseEntity<Object> getNewsfeed(@PathVariable Long userId) {
        List<Post> posts = postService.getNewsfeed(userId);
        return ResponseEntity.ok(posts);
    }


}
