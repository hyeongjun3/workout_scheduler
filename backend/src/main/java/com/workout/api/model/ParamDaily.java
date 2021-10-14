package com.workout.api.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class ParamDaily {
    @NotEmpty
    @Size(min = 2, max = 10)
    @ApiModelProperty(value = "몸무게", required = true)
    private String weight;
}