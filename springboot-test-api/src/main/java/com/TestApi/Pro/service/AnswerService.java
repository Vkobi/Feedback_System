package com.TestApi.Pro.service;
import com.TestApi.Pro.entity.Answer;
import com.TestApi.Pro.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {
    @Autowired
    private AnswerRepository repository;
    public Answer saveAnswer(Answer answer){
        return repository.save(answer);
    }
    public List<Answer> saveAnswers(List<Answer> answer){
        return repository.saveAll(answer);
    }
    public List<Answer> getAnswer(){
        return repository.findAll();
    }
    public Answer getAnswerById(int id){
        return repository.findById(id).orElse(null);
    }
    public List<Answer> findByTester(String tester){
        return repository.findByTester(tester);
    }
    public List<Answer> findByQuestion(String question){
        return repository.findByQuestion(question);
    }

    public String deleteAnswer(int id){
        repository.deleteById(id);
        return "Answer removed Successfully!!";

    }

    public Answer updateAnswer(Answer answer){
        Answer existingAnswer=repository.findById(answer.getAnswer_id()).orElse(null);
        existingAnswer.setAnswer(answer.getAnswer());
        existingAnswer.setQuestion(answer.getQuestion());
        existingAnswer.setRanges(answer.getRanges());
        existingAnswer.setTester(answer.getTester());
        return repository.save(existingAnswer);
    }


}
