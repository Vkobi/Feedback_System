package com.TestApi.Pro.service;
import com.TestApi.Pro.entity.User;
import com.TestApi.Pro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;
    public User saveUser(User user){
        return repository.save(user);
    }
    public List<User> saveUsers(List<User> user){
        return repository.saveAll(user);
    }
    public List<User> getUser(){
        return repository.findAll();
    }
    public User getUserById(int id){
        return repository.findById(id).orElse(null);
    }
    public User getUserByName(String name){
        return repository.findByName(name);
    }

    public User getUserByEmail(String email){
        return repository.findByEmail(email);
    }

    public String deleteUser(int id){
        repository.deleteById(id);
        return "User removed Successfully!!";

    }

    public User updateUser(User user){
        User existingUser=repository.findById(user.getUser_id()).orElse(null);
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setUsertype(user.getUsertype());
        existingUser.setPassword(user.getPassword());
        return repository.save(existingUser);
    }
}
