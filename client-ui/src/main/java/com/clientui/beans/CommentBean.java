package com.clientui.beans;

import lombok.Data;

@Data
public class CommentBean {
    private int id;
    private int idDeal;
    private String comment;
    private String author;
}
