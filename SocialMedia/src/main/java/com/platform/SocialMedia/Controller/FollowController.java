package com.platform.SocialMedia.Controller;

import com.platform.SocialMedia.Services.FollowService;
import com.platform.SocialMedia.dto.FollowDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

public class FollowController {

    @Autowired
    private FollowService followService;

    @PostMapping("/follow")
    public ResponseEntity<String> followUser(@RequestBody FollowDTO followDTO) {
        followService.followUser(followDTO);
        return ResponseEntity.ok("User followed successfully.");
    }

    @PostMapping("/unfollow")
    public ResponseEntity<String> unfollowUser(@RequestBody FollowDTO followDTO) {
        followService.unfollowUser(followDTO);
        return ResponseEntity.ok("User unfollowed successfully.");
    }

    @GetMapping("/isFollowing")
    public ResponseEntity<Boolean> isFollowing(@RequestParam Long userId, @RequestParam Long followerId) {
        boolean following = followService.isFollowing(userId, followerId);
        return ResponseEntity.ok(following);
    }
}
