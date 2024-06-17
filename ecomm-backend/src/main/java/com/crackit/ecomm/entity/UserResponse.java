package com.crackit.ecomm.entity;

import lombok.Data;

import java.util.List;

@Data
public class UserResponse {
    private Integer userId;
    private String firstName;
    private String lastName;
    private String userName;
    private List<Address> addressList;
}
