package com.workout.api.advice.exception;

public class CUserNotMatchPasswordException extends RuntimeException {
    public CUserNotMatchPasswordException(String msg, Throwable t) {
        super(msg, t);
    }

    public CUserNotMatchPasswordException(String msg) {
        super(msg);
    }

    public CUserNotMatchPasswordException() {
        super();
    }
}