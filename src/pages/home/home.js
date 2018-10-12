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
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { AuthService } from '../../providers/auth.service';
var HomePage = /** @class */ (function () {
    function HomePage(alertCtrl, navCtrl, menuCtrl, loadingCtrl, toastCtrl, authService, fb) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.fb = fb;
    }
    HomePage.prototype.ngOnInit = function () {
        this.loginFirebaseAccountForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.email = this.loginFirebaseAccountForm.controls['email'];
        this.password = this.loginFirebaseAccountForm.controls['password'];
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.menuCtrl.enable(false);
        this.menuCtrl.swipeEnable(false);
    };
    HomePage.prototype.ionViewWillLeave = function () {
        this.menuCtrl.enable(true);
        this.menuCtrl.swipeEnable(true);
    };
    HomePage.prototype.sigIn = function (signInForm) {
        var _this = this;
        var loading = this.showLoading();
        this.authService.signinWithEmail(signInForm)
            .then(function (result) {
            loading.dismiss();
            _this.navCtrl.setRoot(TabsNavigationPage);
        }).catch(function (error) {
            loading.dismiss();
            _this.showError(error);
            console.error(error);
        });
    };
    HomePage.prototype.showError = function (error) {
        var alert = this.alertCtrl.create({
            title: 'Problema ao logar',
            subTitle: 'E-mail ou senha incorreto',
            buttons: ['Voltar']
        });
        alert.present();
    };
    HomePage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: "Por favor aguarde... Entrando"
        });
        loading.present();
        return loading;
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [AlertController,
            NavController,
            MenuController,
            LoadingController,
            ToastController,
            AuthService,
            FormBuilder])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map