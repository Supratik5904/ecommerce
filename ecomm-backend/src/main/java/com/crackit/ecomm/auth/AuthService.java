package com.crackit.ecomm.auth;

import com.crackit.ecomm.config.JwtService;
import com.crackit.ecomm.user.Role;
import com.crackit.ecomm.user.User;
import com.crackit.ecomm.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthService {
    private  final UserRepository userRepository;
    private  final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        if(Objects.isNull(registerRequest.getRole())){
            registerRequest.setRole(Role.MEMBER);
        }
        var user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .userName(registerRequest.getUserName())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(registerRequest.getRole())
                .build();
        var savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(savedUser);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .userName(user.getUsername())
                .role(user.getRole())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        //FirstStep
        //We need to validate our request (validate whether password & username is correct)
        //Verify whether user present in the database
        //Which AuthenticationProvider -> DaoAuthenticationProvider (Inject)
        //We need to authenticate using authenticationManager injecting this authenticationProvider
        //SecondStep
        //Verify whether userName and password is correct => UserNamePasswordAuthenticationToken
        //Verify whether user present in db
        //generateToken
        //Return the token
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserName(),
                        request.getPassword()
                )
        );
        var user = userRepository.findUserByUserName(request.getUserName())
                .orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .userName(user.getUsername())
                .role(user.getRole())
                .build();
    }
}