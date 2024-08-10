package com.platform.SocialMedia.dto;

import com.platform.SocialMedia.Entity.Comment;
import com.platform.SocialMedia.Entity.User;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostDTO {
    private Long id;
    private String content;
    private Date createDate;
    private Long authorId;
    private String fullName;
    private List<CommentDTO> comment;
    private List<Long> likeIds;
}
