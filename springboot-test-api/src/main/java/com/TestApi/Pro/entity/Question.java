package com.TestApi.Pro.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="QUESTION_TABLE")
public class Question {
    @Id
    @GeneratedValue
    private int question_id;
    private String question;
}
