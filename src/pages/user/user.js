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
import { ModalController } from 'ionic-angular';
import { UserService } from '../../providers/user.service';
import { EditTelephoneComponent } from '../../components/edit-telephone/edit-telephone';
var UserPage = /** @class */ (function () {
    function UserPage(userService, modalCtrl) {
        this.userService = userService;
        this.modalCtrl = modalCtrl;
    }
    UserPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser()
            .then(function (_user) { return _this.user = _user; });
    };
    UserPage.prototype.openModal = function () {
        this.modalCtrl.create(EditTelephoneComponent).present();
    };
    UserPage = __decorate([
        Component({
            selector: 'page-user',
            templateUrl: 'user.html'
        }),
        __metadata("design:paramtypes", [UserService,
            ModalController])
    ], UserPage);
    return UserPage;
}());
export { UserPage };
//# sourceMappingURL=user.js.map