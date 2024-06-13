package com.crackit.ecomm.rest;

import com.crackit.ecomm.entity.Address;
import com.crackit.ecomm.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/address")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping
    public List<Address> addressByUser(){
        return addressService.findAddressesForLoggedInUser();
    }

    @PostMapping
    public List<Address> addAddress(@RequestBody  Address address){
        return addressService.addAddress(address);
    }

    @PutMapping("/{id}")
    public List<Address> updateAddress(@PathVariable("id") Long addressId,@RequestBody Address address){
        return addressService.updateUserAddress(addressId,address);
    }

}
