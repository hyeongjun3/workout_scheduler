package com.workout.api;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class Application {
    public static void main(String arg[]){
        String os = System.getProperty("os.name").toLowerCase();

        if (os.contains("win")) {
            new SpringApplicationBuilder(Application.class)
                    .properties(
                            "spring.config.location=" +
                                    "C:\\Users\\gyuse\\Desktop\\application-local.yml"
                    )
                    .run(arg);
        }
        else {
            new SpringApplicationBuilder(Application.class)
                    .properties(
                            "spring.config.location=" +
                                    "\\home\\ec2-user\\app\\application-dev.yml"
                    )
                    .run(arg);
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}