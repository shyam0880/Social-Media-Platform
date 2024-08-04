package com.platform.SocialMedia.Controller;

import com.platform.SocialMedia.Entity.User;
import com.platform.SocialMedia.Services.UserService;
import com.platform.SocialMedia.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateUser(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();

        if (userService.validateUser(email, password)) {
            UserDTO users = userService.findsByEmail(email);
            return ResponseEntity.ok(users);
            //return ResponseEntity.status(200).body("Invalid credentials");

        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }


//    @GetMapping("/{id}")
//    public ResponseEntity<User> getUserById(@PathVariable Long id) {
//        User user = userService.getUserById(id);
//        return ResponseEntity.ok(user);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUsersById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<Object> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/{id}/follow")
    public ResponseEntity<Void> followUser(@PathVariable Long id, @RequestBody User follower) {
        userService.followUser(id, follower);
        return ResponseEntity.ok().build();
    }

}
