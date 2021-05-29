package com.workout.api.controller.v1;

import com.workout.api.advice.exception.*;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Api(tags = {"2. User"})
@RequiredArgsConstructor // Autowired 대신 사용 가능(final 선언)
@RestController // 결과값을 JSON으로 출력
@RequestMapping(value = "/v1") // api resource 버전 관리
public class UserController {
    private final UserJpaRepository userJpaRepository;
    private final ResponseService responseService;
    private final PasswordEncoder passwordEncoder;

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
    //public SingleResult<User> findUserById(@ApiParam(value = "언어", defaultValue = "ko") @RequestParam String lang) {
    public SingleResult<User> findUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return responseService.getSingleResult(userJpaRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new));
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 수정", notes = "회원정보를 수정한다")
    @PatchMapping(value = "/user")
    public SingleResult<User> modify(
            @ApiParam(value = "닉네임", required = true) @RequestParam String name,
            @ApiParam(value = "성별", required = true) @RequestParam String gender) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userJpaRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);
        user.setName(name);
        user.setGender(gender);
        return responseService.getSingleResult(userJpaRepository.save(user));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 비밀번호 수정", notes = "회원 비밀번호를 수정한다")
    @PatchMapping(value = "/user/password")
    public SingleResult<User> passwordModify(
            @ApiParam(value = "기존 패스워드", required = true) @RequestParam String password,
            @ApiParam(value = "새로운 패스워드", required = true) @RequestParam String newPassword,
            @ApiParam(value = "새로운 패스워드 확인", required = true) @RequestParam String confirmPassword) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userJpaRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);

        if(!passwordEncoder.matches("{noop}" + password, user.getPassword()))
            throw new CUserNotMatchPasswordException();
        if(passwordEncoder.matches("{noop}" + newPassword, user.getPassword()))
            throw new CUserSamePasswordException();
        if(!newPassword.equals(confirmPassword))
            throw new CUserConfirmPasswordException();

        user.setPassword(passwordEncoder.encode("{noop}" + newPassword));

        return responseService.getSingleResult(userJpaRepository.save(user));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 삭제", notes = "회원정보를 삭제한다")
    @DeleteMapping(value = "/user")
    public CommonResult delete() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userJpaRepository.findByEmail(email).orElseThrow(CEmailSigninFailedException::new);
        userJpaRepository.deleteById(user.getUid());
        return responseService.getSuccessResult();
    }
}

