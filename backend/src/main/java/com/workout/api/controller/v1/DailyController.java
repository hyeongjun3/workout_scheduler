package com.workout.api.controller.v1;

import com.workout.api.advice.exception.CUserNotFoundException;
import com.workout.api.entity.Daily;
import com.workout.api.entity.User;
import com.workout.api.model.ParamDaily;
import com.workout.api.model.response.CommonResult;
import com.workout.api.model.response.ListResult;
import com.workout.api.model.response.SingleResult;
import com.workout.api.repository.UserJpaRepository;
import com.workout.api.service.DailyService;
import com.workout.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;

@Api(tags = {"3. Daily"})
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/daily")
public class DailyController {

    private final DailyService dailyService;
    private final ResponseService responseService;
    private final UserJpaRepository userJpaRepository;
    private Date nowDate;
    private final SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");


    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "데일리 작성", notes = "데일리를 작성한다.")
    @PostMapping(value = "/post")
    public SingleResult<Daily> daily(@Valid @ModelAttribute ParamDaily daily) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        nowDate = new Date();
        String date = formatDate.format(nowDate);
        return responseService.getSingleResult(dailyService.writeDaily(email, date, daily));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "유저 데일리 리스트 조회", notes = "유저 데일리 리스트 조회.")
    @GetMapping(value = "/posts") // did = daily id
    public ListResult<Daily> dailys() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userJpaRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);

        return responseService.getListResult(dailyService.findDailys(user));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "데일리 상세 조회", notes = "데일리 상세정보 조회.")
    @GetMapping(value = "/post/did/{did}") // did = daily id
    public SingleResult<Daily> daily(@PathVariable long did) {
        return responseService.getSingleResult(dailyService.getDaily(did));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "데일리 상세 조회(date)", notes = "데일리 상세정보 조회(date)")
    @GetMapping(value = "/post/date/{date}") // date = 조회 날짜 (yyMMdd)
    public SingleResult<Daily> daily_date(@PathVariable String date) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return responseService.getSingleResult(dailyService.getDailyDate(email, date));
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "데일리 수정", notes = "데일리를 수정한다.")
    @PutMapping(value = "/post/date/{date}")
    public SingleResult<Daily> daily(@PathVariable String date, @Valid @ModelAttribute ParamDaily daily) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return responseService.getSingleResult(dailyService.updateDaily(email, date, daily));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "데일리 삭제", notes = "데일리를 삭제한다.")
    @DeleteMapping(value = "/post/{did}")
    public CommonResult deleteDaily(@PathVariable long did) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        dailyService.deleteDaily(did, email);
        return responseService.getSuccessResult();
    }
}