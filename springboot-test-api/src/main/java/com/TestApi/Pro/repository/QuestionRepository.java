package com.TestApi.Pro.repository;

import com.TestApi.Pro.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Integer> {
    Question findByQuestion(String name);
}
