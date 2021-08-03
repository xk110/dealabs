package com.clientui.beans;

import lombok.Data;

public class CommentBean {
    private int id;
    private int idDeal;
    private String comment;
    private String author;

    public void setId(int id) {
        this.id = id;
    }

    public void setIdDeal(int idDeal) {
        this.idDeal = idDeal;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getId() {
        return id;
    }

    public int getIdDeal() {
        return idDeal;
    }

    public String getComment() {
        return comment;
    }

    public String getAuthor() {
        return author;
    }
}
