"use strict"

import RequiredValidator from "./RequiredValidator";
import PositiveNumberValidator from "./PositiveNumberValidator";
import MaxLengthValidator from "./MaxLengthValidator";

export default class ValidatorFactory {
    factory(type) {
        switch (type) {
            case 'required':
                return new RequiredValidator();

            case 'positiveNumber':
                return new PositiveNumberValidator();

            case 'maxLength':
                return new MaxLengthValidator();

            default:
                throw new Error("Validator " + type + " not supported");
        }
    }
}