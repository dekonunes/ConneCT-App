var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { UserService } from '../providers/user.service';
import { AuthService } from '../providers/auth.service';
var MyApp = /** @class */ (function () {
    function MyApp(platform, authService) {
        this.platform = platform;
        this.authService = authService;
        this.initializeApp();
        this.pagesMenu = [
            { title: 'Meus Dados', component: UserPage, icon: 'person' }
        ];
    }
    MyApp.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getUID()
            .then(function (userLogin) {
            if (userLogin)
                _this.nav.push(TabsNavigationPage);
            else
                _this.nav.push(HomePage);
        });
    };
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    };
    MyApp.prototype.logOut = function () {
        var _this = this;
        this.authService.logOut().then(function () { return _this.nav.setRoot(HomePage); });
    };
    MyApp.prototype.goToOtherPage = function (page) {
        this.nav.push(page.component);
    };
    __decorate([
        ViewChild('homeNav'),
        __metadata("design:type", NavController)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html',
            providers: [UserService]
        }),
        __metadata("design:paramtypes", [Platform,
            AuthService])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map