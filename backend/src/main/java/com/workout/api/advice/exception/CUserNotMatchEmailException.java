package com.workout.api.advice.exception;

public class CUserNotMatchEmailException extends RuntimeException {
    public CUserNotMatchEmailException(String msg, Throwable t) {
        super(msg, t);
    }

    public CUserNotMatchEmailException(String msg) {
        super(msg);
    }

    public CUserNotMatchEmailException() {
        super();
    }
}