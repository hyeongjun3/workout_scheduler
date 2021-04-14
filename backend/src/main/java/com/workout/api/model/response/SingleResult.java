package com.workout.api.model.response;

import lombok.Getter;
import lombok.Setter;

// 결과가 단일 건일 때
@Getter
@Setter
public class SingleResult<T> extends CommonResult {
    private T data;
}