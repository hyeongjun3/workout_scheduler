package com.workout.api.advice.exception;

public class CUserSamePasswordException extends RuntimeException {
    public CUserSamePasswordException(String msg, Throwable t) {
        super(msg, t);
    }

    public CUserSamePasswordException(String msg) {
        super(msg);
    }

    public CUserSamePasswordException() {
        super();
    }
}