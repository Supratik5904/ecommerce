package com.crackit.ecomm.service;

import com.crackit.ecomm.config.JwtAuthFilter;
import com.crackit.ecomm.dao.AddressRepository;
import com.crackit.ecomm.entity.Address;
import com.crackit.ecomm.entity.UserResponse;
import com.crackit.ecomm.user.User;
import com.crackit.ecomm.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;

    public List<UserResponse> getAllUsers(){
        List<UserResponse> userResponseList = new ArrayList<>();
        List<User> user=  userRepository.findAll();
        for(User u: user){
            List<Address> addressList = addressRepository.findAddressByUser(u);
            userResponseList.add(convertToUserResponse(u,addressList));
        }
        return userResponseList;
    }

    public UserResponse getUserByUserName(String userName) {
        Optional<User> user = userRepository.findUserByUserName(userName);
        if(user.isPresent()){
            List<Address> addressList = addressRepository.findAddressByUser(user.get());
            return convertToUserResponse(user.get(),addressList);
        }else{
            return new UserResponse();
        }
    }
    public UserResponse getLoggedinUser(){
        Optional<User> user=  userRepository.findUserByUserName(JwtAuthFilter.CURR_USER);
        if(user.isPresent()){
            List<Address> addressList = addressRepository.findAddressByUser(user.get());
            return convertToUserResponse(user.get(),addressList);
        }else{
            return new UserResponse();
        }
    }


    public void updateUser(Integer userId, UserResponse userResponse){
        Optional<User> optionaluserEntity = userRepository.findById(userId);
        if(optionaluserEntity.isPresent()){
            User userEntity = optionaluserEntity.get();
            userEntity.setUserName(userResponse.getUserName());
            userEntity.setFirstName(userResponse.getFirstName());
            userEntity.setLastName(userResponse.getLastName());
            userRepository.save(userEntity);
        }
    }

    private UserResponse convertToUserResponse(User user, List<Address> addressList){
        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(user.getId());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setUserName(user.getUsername());
        userResponse.setAddressList(addressList);
        return userResponse;
    }
}
