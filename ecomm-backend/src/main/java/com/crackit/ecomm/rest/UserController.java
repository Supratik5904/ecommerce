package com.crackit.ecomm.rest;

import com.crackit.ecomm.entity.UserResponse;
import com.crackit.ecomm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasAuthority('admin:read')")
    public List<UserResponse> allUsers(){
        return userService.getAllUsers();

    }

    @GetMapping("/loggedInUser")
    public UserResponse getLoggedInuser(){
        return userService.getLoggedinUser();
    }


    @GetMapping("/{userName}")
    public UserResponse getUser(@PathVariable("userName") String userName){
        return userService.getUserByUserName(userName);
    }

    @PutMapping("/{userId}")
    public void updateUser(@PathVariable("userId") Integer userId,@RequestBody UserResponse user){
        userService.updateUser(userId,user);
    }
}
