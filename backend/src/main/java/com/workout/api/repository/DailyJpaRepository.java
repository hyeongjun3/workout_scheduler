package com.workout.api.repository;

import com.workout.api.entity.Daily;
import com.workout.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DailyJpaRepository extends JpaRepository<Daily, Long> {
    List<Daily> findByUser(User user);
    Optional<Daily> findByEmailAndDate(String email, String date);
}