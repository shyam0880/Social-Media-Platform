package com.platform.SocialMedia.Controller;

import com.platform.SocialMedia.Entity.Post;
import com.platform.SocialMedia.Services.PostService;
import com.platform.SocialMedia.dto.PostDTO;
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

    @GetMapping("/getallpost")
    public ResponseEntity<Object> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/findallpost")
    public ResponseEntity<List<PostDTO>> findAllPosts() {
        List<PostDTO> posts = postService.findAllPosts();
        return ResponseEntity.ok(posts);
    }

}
