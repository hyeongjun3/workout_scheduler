package com.workout.api.advice.exception;

public class CUserConfirmPasswordException extends RuntimeException {
    public CUserConfirmPasswordException(String msg, Throwable t) {
        super(msg, t);
    }

    public CUserConfirmPasswordException(String msg) {
        super(msg);
    }

    public CUserConfirmPasswordException() {
        super();
    }
}