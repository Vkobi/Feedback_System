package com.TestApi.Pro.service;
import com.TestApi.Pro.entity.Question;
import com.TestApi.Pro.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository repository;
    public Question saveQuestion(Question question){
        return repository.save(question);
    }
    public List<Question> saveQuestions(List<Question> questions){
        return repository.saveAll(questions);
    }
    public List<Question> getQuestions(){
        return repository.findAll();
    }
    public Question getQuestionById(int id){
        return repository.findById(id).orElse(null);
    }
    public Question getQuestionByQuestion(String name){
        return repository.findByQuestion(name);
    }
    public String deleteQuestion(int id){
        repository.deleteById(id);
        return "Question removed Successfully!!";

    }
    public Question updateQuestion(Question question){
        Question existingQuestion=repository.findById(question.getQuestion_id()).orElse(null);
        existingQuestion.setQuestion(question.getQuestion());
        return repository.save(existingQuestion);
    }
}
