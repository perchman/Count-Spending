"use strict"

export default class RequiredValidator {
    validate(value) {
        if (!value) {
            return "Required field";
        }
        return null;
    }
}