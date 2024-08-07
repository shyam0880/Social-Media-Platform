# Social-Media-Platform
<pre>
##Backend Structure
    src/main/java/com/platform/SocialMedia
    ├── Confiuration
    |    └── WebConfig        //It help to connect React and SpringBoot
    ├── Controller 
    │   ├── CommentController.java
    │   ├── PostController.java
    │   └── UserController.java
    ├── DTO
    │   ├── CommentDTO.java
    │   ├── PostDTO.java
    │   └── UserDTO.java
    ├── Entity
    │   ├── Comment.java
    │   ├── Like.java
    │   ├── Post.java
    │   └── User.java
    ├── Repository
    │   ├── CommentRepository.java
    │   ├── LikeRepository.java
    │   ├── PostRepository.java
    │   └── UserRepository.java
    ├── Service
    │   ├── CommentService.java
    │   ├── CommentServiceImpl.java
    │   ├── PostService.java
    │   ├── PostServiceImpl.java
    │   ├── UserService.java
    │   └── UserServiceImpl.java
    └── SocialMediaApplication.java
</pre>

### Registration feature:
    o  If profileUrl (profile image) not provide then it use default image
