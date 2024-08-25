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

### Registration functions:
    o  If profileUrl (profile image) not provide then it use default image based on gender (male, female, other)
    o  Password: Minimum 6 letter , 1 uppercase, 1 lowercase 1 character, 1 digit must satisfy
    o  while Register : check email present or not
            Yes :-> message " Email already exist "
            No  :-> register navigate to login

### Login function:
    o  while LogIn : check email present or not
            Yes :-> check email and password valid 
                        Yes :-> navigate to profile
                        No  :->  message "  Invalid Crediantial "
            No  :-> message " Email does not exist "
    o  Show and Hight password

### Home function:
    o  Create post component
             └── Create post  (live update on NewsFeed)
    o  News fees component
             └── Shows all the post based on recent time first
    o  User List component
             └── List of all the users (likes Friend)
    o  Recent component ( under developing)

### Profile function:
    o  It contain the user data like Name, Bio, email, Role, DOB, Gender
    o  This profile can be use for see other user 
    o  Add button like 
            (if own profile) : update Button 
                                   └── it change page to update data in real time and save the data
            (if other user profile) : Follow & Chat Button (under dev..)

### Other function:
    o  Use useContext to circulate data like user, userlist, post and also function like fetchUsers, handleLogin, etc
    o  Store data locally so no need to fetch each time refresh and can show data even without active Spring Boot
    o  No Direct pass to Page throught url (:except users profile)
            

