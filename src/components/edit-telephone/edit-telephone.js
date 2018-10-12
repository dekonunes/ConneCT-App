var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { UserService } from '../../providers/user.service';
var EditTelephoneComponent = /** @class */ (function () {
    function EditTelephoneComponent(viewCtrl, userService) {
        this.viewCtrl = viewCtrl;
        this.userService = userService;
    }
    EditTelephoneComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser()
            .then(function (_user) { return _this.user = _user; });
    };
    EditTelephoneComponent.prototype.updateTelephone = function (newTelephone) {
        this.userService.updateTelephone(newTelephone);
    };
    EditTelephoneComponent.prototype.updateOtherTelephone = function (newTelephone) {
        this.userService.updateOtherTelephone(newTelephone);
    };
    EditTelephoneComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditTelephoneComponent = __decorate([
        Component({
            selector: 'edit-telephone',
            templateUrl: 'edit-telephone.html'
        }),
        __metadata("design:paramtypes", [ViewController,
            UserService])
    ], EditTelephoneComponent);
    return EditTelephoneComponent;
}());
export { EditTelephoneComponent };
//# sourceMappingURL=edit-telephone.js.map