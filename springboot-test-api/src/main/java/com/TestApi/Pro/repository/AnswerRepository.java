package com.TestApi.Pro.repository;
import com.TestApi.Pro.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Integer> {


    List<Answer> findByQuestion(String tester);

    List<Answer> findByTester(String tester);
}
