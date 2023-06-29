"use strict"

export default class PositiveNumberValidator {
    validate(value) {
        if (value < 0) {
            return "Number cannot be negative";
        }
        return null;
    }
}