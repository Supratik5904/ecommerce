package com.crackit.ecomm.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.crackit.ecomm.user.Permission.*;
import static com.crackit.ecomm.user.Role.ADMIN;
import static com.crackit.ecomm.user.Role.MEMBER;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers("/api/v1/auth/*","/api/v1/category","/api/v1/category/subCategory","/api/v1/category/subCategoryByParent","api/v1/reviews/","/api/v1/products/allProducts/**","/api/v1/products/get/**")
                                .permitAll()
                                .requestMatchers("/api/v1/reviews/**").hasAnyRole(ADMIN.name(),MEMBER.name())
                                .requestMatchers("/api/v1/user").hasAnyRole(ADMIN.name(),MEMBER.name())
                                .requestMatchers("/api/v1/address/**").hasAnyRole(ADMIN.name(),MEMBER.name())
                                .requestMatchers("/api/v1/products/**").hasAnyRole(ADMIN.name(), MEMBER.name())
                                .requestMatchers("/api/v1/cart/**").hasAnyRole(ADMIN.name(),MEMBER.name())
                                .requestMatchers("/api/v1/management/**").hasAnyRole(ADMIN.name(), MEMBER.name())
                                .requestMatchers(GET, "/api/v1/management/**").hasAnyAuthority(ADMIN_READ.name(), MEMBER_READ.name())
                                .requestMatchers(POST, "/api/v1/management/**").hasAnyAuthority(ADMIN_CREATE.name(), MEMBER_CREATE.name())
                                .requestMatchers(POST, "/api/v1/products/**").hasAnyAuthority(ADMIN_CREATE.name(), MEMBER_CREATE.name())
                                .requestMatchers(PUT,"/api/v1/products/**").hasAnyAuthority(ADMIN_CREATE.name())
                                .requestMatchers("/api/v1/orders/**").hasAnyRole(ADMIN.name(),MEMBER.name())
                                .requestMatchers(POST,"/api/v1/orders/**").hasAnyAuthority(ADMIN_CREATE.name(),MEMBER_CREATE.name())
                                .requestMatchers(PUT,"/api/v1/orders/**").hasAnyAuthority(ADMIN_CREATE.name(),MEMBER_CREATE.name())
                                .requestMatchers(POST,"/api/v1/cart/**").hasAnyAuthority(ADMIN_CREATE.name(),MEMBER_CREATE.name())
                                .requestMatchers(GET,"/api/v1/cart/**").hasAnyAuthority(ADMIN_READ.name(), MEMBER_READ.name())
                                .requestMatchers(PUT,"/api/v1/cart/**").hasAnyAuthority(ADMIN_CREATE.name(), MEMBER_CREATE.name())
                                .requestMatchers(GET,"/api/v1/address/**").hasAnyAuthority(ADMIN_READ.name(), MEMBER_READ.name())
                                .requestMatchers(POST,"/api/v1/address/**").hasAnyAuthority(ADMIN_CREATE.name(), MEMBER_CREATE.name())
                                .requestMatchers(PUT,"/api/v1/address/**").hasAnyAuthority(ADMIN_CREATE.name(), MEMBER_CREATE.name())
                                .requestMatchers(GET,"/api/v1/reviews/**").hasAnyAuthority(ADMIN_READ.name(), MEMBER_READ.name())
                                .requestMatchers(POST,"/api/v1/reviews/**").hasAnyAuthority(ADMIN_CREATE.name(), MEMBER_CREATE.name())
                                .requestMatchers(PUT,"/api/v1/reviews/**").hasAnyAuthority(ADMIN_CREATE.name(), MEMBER_CREATE.name())
                                .requestMatchers(PUT,"/api/v1/category/**").hasAnyAuthority(ADMIN_CREATE.name())
                                .requestMatchers(POST,"/api/v1/category/**").hasAnyAuthority(ADMIN_CREATE.name())
                                .requestMatchers(GET,"/api/v1/user").hasAnyAuthority(ADMIN.name(),MEMBER.name())
                                .requestMatchers(POST,"/api/v1/user").hasAnyAuthority(ADMIN.name(),MEMBER.name())
                                .requestMatchers(PUT,"/api/v1/user").hasAnyAuthority(ADMIN.name(),MEMBER.name())

                                .anyRequest()
                                .authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
