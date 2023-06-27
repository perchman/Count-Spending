"use strict"

import RequiredValidator from "./RequiredValidator";

export default class ValidatorFactory {
    factory(type) {
        switch (type) {
            case 'required':
                return new RequiredValidator()

            default:
                throw new Error("Validator " + type + " not supported");
        }
    }
}