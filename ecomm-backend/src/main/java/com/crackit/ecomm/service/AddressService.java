package com.crackit.ecomm.service;

import com.crackit.ecomm.config.JwtAuthFilter;
import com.crackit.ecomm.dao.AddressRepository;
import com.crackit.ecomm.entity.Address;
import com.crackit.ecomm.user.User;
import com.crackit.ecomm.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;
    public List<Address> findAddressesForLoggedInUser() {
        User user = userRepository.findUserByUserName(JwtAuthFilter.CURR_USER).get();
        return addressRepository.findAddressByUser(user);
    }

    public List<Address> addAddress(Address address){
        User user = userRepository.findUserByUserName(JwtAuthFilter.CURR_USER).get();
        address.setUser(user);
        addressRepository.save(address);
        return addressRepository.findAddressByUser(user);
    }

    public List<Address> updateUserAddress(Long addressId, Address address) {
        User user = userRepository.findUserByUserName(JwtAuthFilter.CURR_USER).get();
        Optional<Address> existingAddress = addressRepository.findById(addressId);
        if(existingAddress.isPresent()){
            existingAddress.get().setCity(address.getCity());
            existingAddress.get().setState(address.getState());
            existingAddress.get().setPinCode(address.getPinCode());
            addressRepository.save(existingAddress.get());
            return addressRepository.findAddressByUser(user);
        }else{
            return null;
        }
    }
}
