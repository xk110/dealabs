package com.clientui.beans;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
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

}
