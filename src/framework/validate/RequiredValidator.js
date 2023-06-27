"use strict"

export default class RequiredValidator {
    validate(value) {
        if (value.length === 0) {
            return "Required field"
        }
    }
}