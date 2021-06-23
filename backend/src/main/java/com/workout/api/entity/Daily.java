package com.workout.api.entity;

import com.workout.api.entity.common.CommonDateEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity // jpa entity
@Getter // user 필드값의 getter를 자동으로 생성
@Setter
@NoArgsConstructor // 인자없는 생성자를 자동으로 생성
public class Daily extends CommonDateEntity {
    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long did;
    @Column(nullable = false, unique = false, length = 50)
    private String email;
    @Column(length = 10)
    private String weight;
    @Column(length = 50)
    private String trainer;
    @Column(length = 10)
    private String date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    private User user;  // 게시글 - 회원의 관계 - N:1

    // 생성자
    public Daily(User user, String email, String date, String weight) {
        this.user = user;
        this.email = email;
        this.date = date;
        this.weight = weight;
    }

    public Daily setUpdate(String weight) {
        this.weight = weight;
        return this;
    }
}