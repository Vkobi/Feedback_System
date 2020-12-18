package com.TestApi.Pro.controller;

import com.TestApi.Pro.entity.Question;
import com.TestApi.Pro.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addQuestion")
    public Question addQustion(@RequestBody Question question){
        return questionService.saveQuestion(question);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addQuestions")
    public List<Question> addQustions(@RequestBody  List<Question> questions){
        return questionService.saveQuestions(questions);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/Questions")
    public  List<Question> findAllQuestions(){
        return  questionService.getQuestions();
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/QuestionById/{id}")
    public  Question findQuestionById(@PathVariable int id){
        return  questionService.getQuestionById(id);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/Questions/{name}")
    public  Question findQuestionByName(@PathVariable String name){
        return  questionService.getQuestionByQuestion(name);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/putQuestion")
    public Question updateQustion(@RequestBody Question question){
        return questionService.updateQuestion(question);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deleteQuestion/{id}")
    public String deleteQuestion(@PathVariable int id){
        return questionService.deleteQuestion(id);
    }
}
