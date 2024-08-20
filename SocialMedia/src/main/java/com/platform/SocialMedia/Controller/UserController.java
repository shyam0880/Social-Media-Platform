package com.platform.SocialMedia.Controller;

import com.platform.SocialMedia.Entity.User;
import com.platform.SocialMedia.Services.UserService;
import com.platform.SocialMedia.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        if(userService.emailExist(user.getEmail())){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email is already registered");
        }else {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(registeredUser);
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateUser(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();

        if(userService.emailExist(email)){
            if (userService.validateUser(email, password)) {
                UserDTO users = userService.findsByEmail(email);
                return ResponseEntity.ok(users);

            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid credentials");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email doest not exist");
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

    @GetMapping("/findAllUsers")
    public ResponseEntity<Object> findAllUsers() {
        List<UserDTO> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/{id}/follow")
    public ResponseEntity<Void> followUser(@PathVariable Long id, @RequestBody User follower) {
        userService.followUser(id, follower);
        return ResponseEntity.ok().build();
    }

}
