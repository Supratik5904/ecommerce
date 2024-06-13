package com.crackit.ecomm.entity;

import com.crackit.ecomm.user.User;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;
import java.util.Objects;

public class OrderInput {
    private String fullName;
    private String fullAddress;
    private String contactNumber;
    private String alternateContactNumber;
    private List<OrderProductQuantity> orderProductQuantityList;

    public OrderInput(String fullName, String fullAddress, String contactNumber, String alternateContactNumber, List<OrderProductQuantity> orderProductQuantityList) {
        this.fullName = fullName;
        this.fullAddress = fullAddress;
        this.contactNumber = contactNumber;
        this.alternateContactNumber = alternateContactNumber;
        this.orderProductQuantityList = orderProductQuantityList;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAlternateContactNumber() {
        return alternateContactNumber;
    }

    public void setAlternateContactNumber(String alternateContactNumber) {
        this.alternateContactNumber = alternateContactNumber;
    }

    public List<OrderProductQuantity> getOrderProductQuantityList() {
        return orderProductQuantityList;
    }

    public void setOrderProductQuantityList(List<OrderProductQuantity> orderProductQuantityList) {
        this.orderProductQuantityList = orderProductQuantityList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderInput that = (OrderInput) o;
        return Objects.equals(fullName, that.fullName) && Objects.equals(fullAddress, that.fullAddress) && Objects.equals(contactNumber, that.contactNumber) && Objects.equals(alternateContactNumber, that.alternateContactNumber) && Objects.equals(orderProductQuantityList, that.orderProductQuantityList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fullName, fullAddress, contactNumber, alternateContactNumber, orderProductQuantityList);
    }

    @Override
    public String toString() {
        return "OrderInput{" +
                "fullName='" + fullName + '\'' +
                ", fullAddress='" + fullAddress + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", alternateContactNumber='" + alternateContactNumber + '\'' +
                ", orderProductQuantityList=" + orderProductQuantityList +
                '}';
    }
}
