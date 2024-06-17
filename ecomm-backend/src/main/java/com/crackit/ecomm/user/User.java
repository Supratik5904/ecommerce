package com.crackit.ecomm.user;

import com.crackit.ecomm.entity.Address;
import com.crackit.ecomm.entity.OrderDetail;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "_user")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Integer id;

    private String firstName;

    private String lastName;

    @Column(nullable = false,unique = true)
    private String userName;

    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,mappedBy = "user")
    @JsonIgnore
    private List<OrderDetail> orderDetailList;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
