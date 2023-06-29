"use strict"

export default class MaxLengthValidator {
    validate(value) {
        console.log(value);
        if (value.length > 1000) {
            return "Max length 1000 symbols";
        }
        return null;
    }
}