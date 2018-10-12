var CheckedValidator = /** @class */ (function () {
    function CheckedValidator() {
    }
    CheckedValidator.isChecked = function (control) {
        var valid = control.value === false || control.value === 'false';
        if (valid) {
            return { isChecked: true };
        }
        return null;
    };
    return CheckedValidator;
}());
export { CheckedValidator };
//# sourceMappingURL=checked.validator.js.map