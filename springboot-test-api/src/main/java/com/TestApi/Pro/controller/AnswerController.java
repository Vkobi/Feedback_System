package com.TestApi.Pro.controller;

import com.TestApi.Pro.entity.Answer;
import com.TestApi.Pro.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AnswerController {
    @Autowired
    private AnswerService Service;
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addAnswer")
    public Answer addAnswer(@RequestBody Answer user){
        return Service.saveAnswer(user);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addAnswers")
    public List<Answer> addAnswers(@RequestBody  List<Answer> user){
        return Service.saveAnswers(user);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/Answers")
    public  List<Answer> findAllAnswers(){
        return  Service.getAnswer();
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/AnswerById/{id}")
    public  Answer findAnswerById(@PathVariable int id){
        return  Service.getAnswerById(id);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/AnswerByQuestion/{question}")
    public  List<Answer>  findAnswerByQuestion(@PathVariable String question){
        return  Service.findByQuestion(question);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/AnswerByTester/{tester}")
    public  List<Answer> findAnswerByTester(@PathVariable String tester){
        return  Service.findByTester(tester);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/putAnswer")
    public Answer updateAnswer(@RequestBody Answer answer){
        return Service.updateAnswer(answer);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deleteAnswer/{id}")
    public String deleteAnswer(@PathVariable int id){
        return Service.deleteAnswer(id);
    }
}
