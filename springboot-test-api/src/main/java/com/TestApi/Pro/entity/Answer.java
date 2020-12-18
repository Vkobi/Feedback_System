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
@Table(name="ANSWER_TABLE")
public class Answer {
    @Id
    @GeneratedValue
    private int answer_id;
    private String tester;
    private String question;
    private String answer;
    private String ranges;

}
