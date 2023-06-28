"use strict"

export default class RequiredValidator {
    validate(value) {
        if (value === null || value.length === 0 ) {
            return "Required field"
        }
        return null;
    }
}