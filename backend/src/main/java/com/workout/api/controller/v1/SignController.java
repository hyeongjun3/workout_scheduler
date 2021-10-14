package com.workout.api.controller.v1;

import com.workout.api.advice.exception.CEmailSigninFailedException;
import com.workout.api.advice.exception.CUserExistException;
import com.workout.api.advice.exception.CUserNotFoundException;
import com.workout.api.advice.exception.CUserNotMatchEmailException;
import com.workout.api.config.security.JwtTokenProvider;
import com.workout.api.entity.User;
import com.workout.api.model.response.CommonResult;
import com.workout.api.model.response.SingleResult;
import com.workout.api.model.social.KakaoProfile;
import com.workout.api.repository.UserJpaRepository;
import com.workout.api.service.ResponseService;
import com.workout.api.service.social.KakaoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@Api(tags = {"1. Sign"})
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1")
public class SignController {

    private final UserJpaRepository userJpaRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ResponseService responseService;
    private final PasswordEncoder passwordEncoder;
    private final KakaoService kakaoService;

    private final String email_regex = "^(([\\w-]+\\.)+[\\w-]+|([a-zA-Z]{1}|[\\w-]{2,}))@"
            + "[A-Za-z0-9-]+(\\.com|abc\\.co|abc\\.nz|abc\\.org|abc\\.net)$";

    @ApiOperation(value = "가입", notes = "회원가입을 한다.")
    @PostMapping(value = "/signup")
    public CommonResult signup(@ApiParam(value = "회원ID : 이메일", required = true) @RequestParam String email,
                               @ApiParam(value = "비밀번호", required = true) @RequestParam String password) {

        if(!email.matches(email_regex)) {
            throw new CUserNotMatchEmailException();
        }

        Optional<User> user = userJpaRepository.findByEmail(email);
        if(user.isPresent()) {
            throw new CUserExistException();
        }

        userJpaRepository.save(User.builder()
                .email(email)
                .password(passwordEncoder.encode("{noop}" + password))
                .roles(Collections.singletonList("ROLE_USER"))
                .build());
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "로그인", notes = "이메일 회원 로그인을 한다.")
    @PostMapping(value = "/signin")
    public SingleResult<String> signin(@ApiParam(value = "회원ID : 이메일", required = true) @RequestParam String email,
                                       @ApiParam(value = "비밀번호", required = true) @RequestParam String password) {
        User user = userJpaRepository.findByEmail(email).orElseThrow(CEmailSigninFailedException::new);
        if (!passwordEncoder.matches("{noop}" + password, user.getPassword()))
            throw new CEmailSigninFailedException();

        return responseService.getSingleResult(jwtTokenProvider.createToken(String.valueOf(user.getUid()), user.getRoles()));

    }

    @ApiOperation(value = "소셜 계정 가입", notes = "소셜 계정 회원가입을 한다.")
    @PostMapping(value = "/signup/{provider}")
    public CommonResult signupProvider(@ApiParam(value = "서비스 제공자 provider", required = true, defaultValue = "kakao") @PathVariable String provider,
                                       @ApiParam(value = "소셜 access_token", required = true) @RequestParam String accessToken,
                                       @ApiParam(value = "이름", required = true) @RequestParam String name) {

        KakaoProfile profile = kakaoService.getKakaoProfile(accessToken);
        System.out.println(profile.getId());
        Optional<User> user = userJpaRepository.findByEmailAndProvider(String.valueOf(profile.getId()), provider);
        if(user.isPresent())
            throw new CUserExistException();

        User inUser = User.builder()
                .email(String.valueOf(profile.getId()))
                .provider(provider)
                .name(name)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();

        userJpaRepository.save(inUser);

        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "소셜 로그인", notes = "소셜 회원 로그인을 한다.")
    @PostMapping(value = "/signin/{provider}")
    public SingleResult<String> signinByProvider(
            @ApiParam(value = "서비스 제공자 provider", required = true, defaultValue = "kakao") @PathVariable String provider,
            @ApiParam(value = "소셜 access_token", required = true) @RequestParam String accessToken) {

        KakaoProfile profile = kakaoService.getKakaoProfile(accessToken);
        User user = userJpaRepository.findByEmailAndProvider(String.valueOf(profile.getId()), provider).orElseThrow(CUserNotFoundException::new);
        return responseService.getSingleResult(jwtTokenProvider.createToken(String.valueOf(user.getUid()), user.getRoles()));
    }
}