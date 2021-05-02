package com.workout.api.controller.v1;

import com.workout.api.advice.exception.CEmailSigninFailedException;
import com.workout.api.advice.exception.CUserNotFoundException;
import com.workout.api.entity.User;
import com.workout.api.model.response.CommonResult;
import com.workout.api.model.response.ListResult;
import com.workout.api.model.response.SingleResult;
import com.workout.api.repository.UserJpaRepository;
import com.workout.api.service.ResponseService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Api(tags = {"2. User"})
@RequiredArgsConstructor // Autowired 대신 사용 가능(final 선언)
@RestController // 결과값을 JSON으로 출력
@RequestMapping(value = "/v1") // api resource 버전 관리
public class UserController {
    private final UserJpaRepository userJpaRepository;
    private final ResponseService responseService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 리스트 조회", notes = "모든 회원을 조회한다.")
    @GetMapping(value = "/users")
    public ListResult<User> findAllUser() {
        return responseService.getListResult(userJpaRepository.findAll());
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = false, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 조회", notes = "특정 회원을 조회한다.")
    @GetMapping(value = "/user")
    public SingleResult<User> findUserById(@ApiParam(value = "언어", defaultValue = "ko") @RequestParam String lang) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return responseService.getSingleResult(userJpaRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new));
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 수정", notes = "회원정보를 수정한다")
    @PutMapping(value = "/user")
    public SingleResult<User> modify(
            @ApiParam(value = "닉네임", required = true) @RequestParam String name,
            @ApiParam(value = "성별", required = true) @RequestParam String gender) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userJpaRepository.findByEmail(email).orElseThrow(CEmailSigninFailedException::new);

        user.setName(name);
        user.setGender(gender);
        return responseService.getSingleResult(userJpaRepository.save(user));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 삭제", notes = "id로 회원정보를 삭제한다")
    @DeleteMapping(value = "/user/{uid}")
    public CommonResult delete(
            @ApiParam(value = "회원번호", required = true) @PathVariable long uid) {
        userJpaRepository.deleteById(uid);
        return responseService.getSuccessResult();
    }
}

