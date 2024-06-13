package com.crackit.ecomm.dao;

import com.crackit.ecomm.entity.Address;
import com.crackit.ecomm.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long> {
    List<Address> findAddressByUser(User user);
}
