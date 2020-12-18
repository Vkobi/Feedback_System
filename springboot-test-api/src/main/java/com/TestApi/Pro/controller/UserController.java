package com.TestApi.Pro.controller;

import com.TestApi.Pro.entity.User;
import com.TestApi.Pro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService Service;
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addUser")
    public User addUser(@RequestBody User user){
        return Service.saveUser(user);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addUsers")
    public List<User> addUsers(@RequestBody  List<User> user){
        return Service.saveUsers(user);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/Users")
    public  List<User> findAllUsers(){
        return  Service.getUser();
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/UserById/{id}")
    public  User findUserById(@PathVariable int id){
        return  Service.getUserById(id);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/Users/{name}")
    public  User findUserByName(@PathVariable String name){
        return  Service.getUserByName(name);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/Login/{email}")
    public  User findUserByEmail(@PathVariable String email){
        return  Service.getUserByEmail(email);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/putUser")
    public User updateUser(@RequestBody User user){
        return Service.updateUser(user);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable int id){
        return Service.deleteUser(id);
    }
}
