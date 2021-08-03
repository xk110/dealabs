package com.clientui.beans;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DealBean {
    private int id;
    private String title;
    private String description;
    private int degree;
    private BigDecimal price;
    private BigDecimal shippingFees;
    private String link;
    private String author;
    private LocalDateTime creationDate;
    private LocalDateTime startingDate;
    private LocalDateTime endingDate;

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDegree(int degree) {
        this.degree = degree;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setShippingFees(BigDecimal shippingFees) {
        this.shippingFees = shippingFees;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public void setStartingDate(LocalDateTime startingDate) {
        this.startingDate = startingDate;
    }

    public void setEndingDate(LocalDateTime endingDate) {
        this.endingDate = endingDate;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public int getDegree() {
        return degree;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BigDecimal getShippingFees() {
        return shippingFees;
    }

    public String getLink() {
        return link;
    }

    public String getAuthor() {
        return author;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public LocalDateTime getStartingDate() {
        return startingDate;
    }

    public LocalDateTime getEndingDate() {
        return endingDate;
    }
}
