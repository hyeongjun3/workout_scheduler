package com.workout.api.service;

import com.workout.api.advice.exception.CNotOwnerException;
import com.workout.api.advice.exception.CResourceNotExistException;
import com.workout.api.advice.exception.CUserNotFoundException;
import com.workout.api.entity.Daily;
import com.workout.api.entity.User;
import com.workout.api.model.ParamDaily;
import com.workout.api.repository.DailyJpaRepository;
import com.workout.api.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class DailyService {

    private final UserJpaRepository userJpaRepository;
    private final DailyJpaRepository dailyJpaRepository;

    // 유저로 게시물 리스트 조회
    public List<Daily> findDailys(User user) {
        return dailyJpaRepository.findByUser(user);
    }

    // 데일리 단건 조회
    public Daily getDaily(long did) {
        return dailyJpaRepository.findById(did).orElseThrow(CResourceNotExistException::new);
    }

    public Daily getDailyDate(String email, String date) {
        return dailyJpaRepository.findByEmailAndDate(email, date).orElseThrow(CResourceNotExistException::new);
    }

    // 데일리 등록
    public Daily writeDaily(String email, String date, ParamDaily paramDaily) {
        User user = userJpaRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);
        Daily newDaily = new Daily(user, user.getEmail(), date, paramDaily.getWeight());

        Daily daily = dailyJpaRepository.findByEmailAndDate(email, date).orElse(null);
        if(daily != null) // daily가 이미 존재하면 수정
            return updateDaily(email, date, paramDaily);
        else // 없으면 새로 생성
            return dailyJpaRepository.save(newDaily);

    }

    // 데일리 수정
    public Daily updateDaily(String email, String date, ParamDaily paramDaily) {
        Daily daily = getDailyDate(email, date);
        User user = daily.getUser();
        if(!email.equals(user.getEmail())) {
            throw new CNotOwnerException();
        }

        daily.setUpdate(paramDaily.getWeight());
        return daily;
    }
    
    // 데일리 삭제
    public boolean deleteDaily(long did, String email) {
        Daily daily = getDaily(did);
        User user = daily.getUser();

        if(!email.equals(user.getEmail())) {
            throw new CNotOwnerException();
        }

        dailyJpaRepository.delete(daily);
        return true;
    }
}