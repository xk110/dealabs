package com.dealabs.docker_microservices.commentservice.dao;

import com.dealabs.docker_microservices.commentservice.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentDao extends JpaRepository<Comment, Integer> {
    /*public List<Comment> findAll(String idDeal);*/

    @Query(value = "SELECT * FROM Comment c WHERE c.id_deal = :idDeal", nativeQuery = true)
    List<Comment>  findAllByIdDeal(@Param("idDeal") int idDeal);

    public Comment findById(int id);

    public Comment save(Comment comment);
}