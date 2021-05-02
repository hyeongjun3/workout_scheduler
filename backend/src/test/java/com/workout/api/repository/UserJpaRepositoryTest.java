package com.workout.api.repository;

import com.workout.api.entity.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collections;
import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserJpaRepositoryTest {

    @Autowired
    private UserJpaRepository userJpaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void whenFindByUid_thenReturnUser() {
        String email = "inu14@naver.com";
        // given
        userJpaRepository.save(User.builder()
                .email(email)
                .password(passwordEncoder.encode("{noop}1234"))
                .roles(Collections.singletonList("ROLE_USER"))
                .build());
        // when
        Optional<User> user = userJpaRepository.findByEmail(email);
        // then
        assertNotNull(user);// user객체가 null이 아닌지 체크
        assertTrue(user.isPresent()); // user객체가 존재여부 true/false 체크
        assertEquals(user.get().getEmail(), email); // user객체의 name과 name변수 값이 같은지 체크
    }
}