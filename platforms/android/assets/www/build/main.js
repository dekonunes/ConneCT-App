webpackJsonp([0],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(263);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthService = (function () {
    function AuthService(afAuth) {
        var _this = this;
        this.afAuth = afAuth;
        afAuth.authState.subscribe(function (user) { return _this.currentUser = user; });
    }
    AuthService.prototype.signinWithEmail = function (user) {
        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
            .then(function (authState) { return authState.uid; })
            .catch(function (erro) { return console.log(erro); });
    };
    AuthService.prototype.getUID = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return _this.afAuth.authState.subscribe(function (_userUID) { return resolve(_userUID.uid); });
        });
    };
    AuthService.prototype.logOut = function () {
        var _this = this;
        return new Promise(function () {
            _this.afAuth.auth.signOut();
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 177;

/***/ }),

/***/ 220:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 220;

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
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
            'email': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            'password': ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6)])]
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
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */]);
        }).catch(function (error) {
            loading.dismiss();
            _this.showError(error);
            console.log(error);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\1513 IRON\Desktop\app\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      ConneCT\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="img">\n    <img src="images/logoHome.jpg" alt="homeScreen">\n  </div>\n\n  <form [formGroup]="loginFirebaseAccountForm" (ngSubmit)="sigIn(loginFirebaseAccountForm.value)">\n        <ion-item [class.error]="!email.valid && email.touched">\n            <ion-label floating>E-mail</ion-label>\n            <ion-input type="text" value="" [formControl]="email"></ion-input>\n        </ion-item>\n        <div *ngIf="email.hasError(\'required\') && email.touched" >* E-mail é necessário.</div>\n        <div *ngIf="email.hasError(\'pattern\') && email.touched">* Enter a valid email address.</div>\n        <ion-item [class.error]="!password.valid && password.touched">\n            <ion-label floating>Senha</ion-label>\n            <ion-input type="password" value="" [formControl]="password"></ion-input>\n        </ion-item>\n        <div *ngIf="password.hasError(\'required\') && password.touched" >* Senha é necessário.</div>\n        <div *ngIf="password.hasError(\'minlength\') && password.touched" >* Senha com mínimo de 6 letras.</div>\n        <br/><br/>\n          <button ion-button type="submit" class="custom-button" [disabled]="!loginFirebaseAccountForm.valid" block>Entrar</button>\n        <br/>\n    </form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\1513 IRON\Desktop\app\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsNavigationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gamification_gamification__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__questions_questions__ = __webpack_require__(457);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsNavigationPage = (function () {
    function TabsNavigationPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gamificationPage = __WEBPACK_IMPORTED_MODULE_2__gamification_gamification__["a" /* GamificationPage */];
        this.questionPage = __WEBPACK_IMPORTED_MODULE_3__questions_questions__["a" /* QuestionsPage */];
    }
    TabsNavigationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-tabs-navigation',template:/*ion-inline-start:"C:\Users\1513 IRON\Desktop\app\src\pages\tabs-navigation\tabs-navigation.html"*/'<ion-header>\n</ion-header>\n\n<ion-content>\n\n  <ion-tabs>\n    <ion-tab tabTitle="Respostas" tabIcon="happy" [root]="questionPage">\n    </ion-tab>\n\n    <ion-tab tabTitle="Jogador" tabIcon="football" [root]="gamificationPage">\n    </ion-tab>\n  </ion-tabs>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\1513 IRON\Desktop\app\src\pages\tabs-navigation\tabs-navigation.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], TabsNavigationPage);
    return TabsNavigationPage;
}());

//# sourceMappingURL=tabs-navigation.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GamificationPage = (function () {
    function GamificationPage(navCtrl, alertCtrl, userService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.ribbonsCareers = [];
        this.ribbonsTopScore = [];
        this.daysCurrent = 0;
        this.heightTrophys = 40;
    }
    GamificationPage.prototype.ngOnInit = function () {
        this.getGamificatios();
    };
    GamificationPage.prototype.onLoad = function (img) {
        this.heightTrophys += img.height;
    };
    GamificationPage.prototype.getGamificatios = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.userService.getUser().then(function (DQ) {
                _this.ranking = DQ.gamification[0];
                for (var i = 0; i <= 5; i++)
                    _this.ribbonsCareers[i] = DQ.gamification[i + 1];
                for (var i = 0; i <= 1; i++)
                    _this.ribbonsTopScore[i] = DQ.gamification[i + 7];
                _this.daysCurrent = DQ.gamification[9]['quantity'];
            });
            _this.userService.getPositionRanking().then(function (position) { return _this.positionRanking = position; });
            resolve();
        });
    };
    GamificationPage.prototype.doRefresh = function (refresher) {
        this.getGamificatios().then(function () { return refresher.complete(); });
    };
    GamificationPage.prototype.alertDescription = function (title, description) {
        var alert = this.alertCtrl.create({
            title: title,
            message: description,
            buttons: [
                'Fechar'
            ]
        });
        alert.present();
    };
    GamificationPage.prototype.getStyleImgTrophy = function () {
        return {
            '-webkit-clip-path': "inset(0px " + (100 - (this.daysCurrent / 365 * 100)) + "% 0px 0px)",
            'clip-path': "inset(0px " + (100 - (this.daysCurrent / 365 * 100)) + "% 0px 0px)",
            'float': 'right'
        };
    };
    GamificationPage.prototype.getStyleImgRanking = function () {
        return {
            '-webkit-clip-path': "inset(" + (100 - this.positionRanking) + "% 0px 0px 0px)",
            'clip-path': "inset(" + (100 - this.positionRanking) + "% 0px 0px 0px)",
            'float': 'right'
        };
    };
    GamificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-gamification',template:/*ion-inline-start:"C:\Users\1513 IRON\Desktop\app\src\pages\gamification\gamification.html"*/'<ion-header>\n</ion-header>\n<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content\n      pullingIcon="arrow-dropdown"\n      pullingText="Pull to refresh"\n      refreshingSpinner="circles"\n      refreshingText="Atualizando...">\n    </ion-refresher-content>\n  </ion-refresher>\n  <ion-card >\n    <ion-card-title text-center>\n      <button ion-button clear color="dark" icon-right\n      (click)="alertDescription(ranking?.title,ranking?.description)">\n        <p>{{ranking?.title}}</p>\n        <ion-icon name="information-circle"></ion-icon>\n      </button>\n      <ion-grid>\n        <ion-row >\n          <ion-col col-8>\n            <p class="descriptionRanking">Você esta acima de {{positionRanking}}% dos jogadores</p>\n            <br>\n            <p class="numberRanking">{{ ranking?.quantity }}</p>\n          </ion-col>\n          <ion-col col-4>\n            <div style="padding-bottom: 90px;">\n              <img class="imgRanking"\n                  src="assets/images/rankingGamification/ballRankingEmpty.jpg"\n              />\n              <img class="imgRanking"\n                  src="assets/images/rankingGamification/ballRanking.jpg"\n                  [ngStyle]="getStyleImgRanking()"\n              />\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card-title>\n  </ion-card>\n  <ion-card >\n    <ion-card-title text-center>\n      <button ion-button clear color="dark" icon-right\n      (click)="alertDescription(\'Carreira\',\'Os emblemas representam o estado\n      da sua carreira\')">\n        <p>Carreira</p>\n        <ion-icon name="information-circle"></ion-icon>\n      </button>\n        <ion-grid>\n          <ion-row >\n            <ion-col col-4 *ngFor="let ribbon of ribbonsCareers"\n                    (click)="alertDescription(ribbon?.title,ribbon?.description)">\n              <p class="titleRibbons">{{ribbon?.title}}</p>\n              <img\n                  src="assets/images/ribbonsCareerGamification/ribbon{{ribbon?.id}}.svg"\n                  [class.grayscale]="!ribbon?.isActive"\n                  class="imgRibbon"/>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n    </ion-card-title>\n  </ion-card>\n  <ion-card >\n    <ion-card-title text-center>\n      <button ion-button clear color="dark" icon-right\n      (click)="alertDescription(\'Artilharia\',\'Estas são as quantidades de dias/semanas que você respondeu consecutivamente\')"\n      >\n        <p>Artilharia</p>\n        <ion-icon name="information-circle"></ion-icon>\n      </button>\n      <ion-grid>\n        <ion-row >\n          <ion-col col-6 *ngFor="let ribbon of ribbonsTopScore"\n                  (click)="alertDescription(ribbon?.title,ribbon?.description)">\n          <p class="titleRibbons">{{ribbon?.title}}</p>\n            <img\n                src="assets/images/ribbonsTopScoreGamification/ribbon{{ribbon?.id}}.svg"\n                [class.grayscale]="!ribbon?.isActive"\n                class="imgRibbon"/><span class="textOverImgArtilharia">{{ribbon?.quantity}}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card-title>\n  </ion-card>\n  <ion-card >\n    <ion-card-title text-center>\n      <button ion-button clear color="dark" icon-right\n      (click)="alertDescription(\'Campeonato\',\'Responda por 365 dias para ser o campeão do campeonato e receber o troféu\')">\n        <p>Campeonato</p>\n        <ion-icon name="information-circle"></ion-icon>\n      </button>\n      <ion-grid [ngStyle]="{\'height\': heightTrophys + \'px\'}">\n        <ion-row >\n          <ion-col col-12 >\n            <p>Quantidade de dias respondidos: {{daysCurrent}}</p>\n            <img  class="imgTrofhys" (load)="onLoad($event.target)"\n                src="assets/images/trofhysGamification/trofhyEmpty.jpg"/>\n            <img\n            src="assets/images/trofhysGamification/trofhy.jpg"\n            [ngStyle]="getStyleImgTrophy()"\n            class="imgTrofhys"/>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card-title>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Users\1513 IRON\Desktop\app\src\pages\gamification\gamification.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_service__["a" /* UserService */]])
    ], GamificationPage);
    return GamificationPage;
}());

//# sourceMappingURL=gamification.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var QuestionsPage = (function () {
    function QuestionsPage(alertCtrl, navCtrl, loadingCtrl, userService) {
        // super();
        //https://github.com/PraveenJP/ionic-animatedsplash/blob/master/www/css/animate.css
        //https://juristr.com/blog/2016/01/learning-ng2-dynamic-styles/
        //https://www.joshmorony.com/getting-familiar-with-local-notifications-in-ionic-2/
        //https://www.youtube.com/watch?v=ZLUmCBexYBo
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.questions = [];
        this.answers = [];
        this.activedIcon = [];
        this.isFlagActive = new Array(20).fill(true);
        this.numberQuestionsDesactived = 0;
        this.loadingFlag = false;
    }
    QuestionsPage.prototype.doRefresh = function (refresher) {
        this.updateQuestions().then(function () { return refresher.complete(); });
    };
    QuestionsPage.prototype.getQuantityAnswered = function () {
        var _this = this;
        this.questions.forEach(function (_question) {
            if (!_question.isActive)
                _this.numberQuestionsDesactived++;
        });
    };
    QuestionsPage.prototype.ngOnInit = function () {
        this.updateQuestions();
    };
    QuestionsPage.prototype.updatePage = function () {
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    };
    QuestionsPage.prototype.updateQuestions = function () {
        var _this = this;
        this.loading = this.showLoading();
        return new Promise(function (resolve) {
            _this.numberQuestionsDesactived = 0;
            _this.userService.getUser().then(function (_user) {
                _this.questions = _user.questions;
                _this.getQuantityAnswered();
                _this.loadingFlag = true;
                _this.loading.dismiss();
                resolve();
            });
        });
    };
    QuestionsPage.prototype.sendAnwers = function (questionID, answersNumber) {
        var date = Date();
        this.activedIcon[questionID] = answersNumber;
        this.isFlagActive[questionID] = false;
        this.answers[questionID] = { questionID: questionID, answersNumber: answersNumber, date: date };
    };
    QuestionsPage.prototype.sendNotification = function () {
        var dateMoment = new Date();
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* LocalNotifications */].schedule({
            id: 1,
            text: 'Como você esta hoje?',
            every: 'day',
            at: dateMoment.getMinutes() - 1,
        });
    };
    QuestionsPage.prototype.confirmAnswers = function () {
        var _this = this;
        var quantityAnwersRanking = 0;
        for (var i in this.questions)
            if (this.answers[i] != undefined)
                quantityAnwersRanking++;
        if (this.answers.length > 0) {
            return new Promise(function (resolve) {
                _this.userService.pushAnswers(_this.answers);
                _this.questionAnwered(_this.answers);
                _this.userService.setRanking(quantityAnwersRanking * 5);
                _this.alertDescription("Respostas enviadas", "Voc\u00EA ganhou " + quantityAnwersRanking * 5 + " pontos", "no ranking");
                _this.updatePage();
                _this.sendNotification();
                _this.answers = [];
                _this.activedIcon = [];
                _this.isFlagActive.fill(true);
            });
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Nenhuma resposta escolhida',
                buttons: [
                    'Fechar'
                ]
            });
            alert_1.present();
        }
    };
    QuestionsPage.prototype.questionAnwered = function (_questionsAnwered) {
        this.userService.setQuestionAnswered(_questionsAnwered);
    };
    QuestionsPage.prototype.alertDescription = function (title, description, answers) {
        var alert = this.alertCtrl.create({
            title: title,
            message: description + "<br>" + answers,
            buttons: [
                'Fechar'
            ]
        });
        alert.present();
    };
    QuestionsPage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: "Por favor aguarde... Baixando as questões."
        });
        loading.present();
        return loading;
    };
    QuestionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-questions',template:/*ion-inline-start:"C:\Users\1513 IRON\Desktop\app\src\pages\questions\questions.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle left>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Perguntas</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content\n\n      pullingIcon="arrow-dropdown"\n\n      pullingText="Puxe para Atualizar"\n\n      refreshingSpinner="circles"\n\n      refreshingText="Atualizando...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n  <div *ngIf="numberQuestionsDesactived === questions.length && loadingFlag === true">\n\n    <img src="assets/images/imagens/allQuestionsAnswered.png" alt="">\n\n  </div>\n\n  <div *ngIf="numberQuestionsDesactived < questions.length">\n\n    <div *ngFor="let question of questions">\n\n        <ion-card *ngIf="question.isActive">\n\n        <ion-card-title text-center>\n\n          <button ion-button clear color="dark" icon-right\n\n                (click)="alertDescription(question.title,question.description, question.answers)">\n\n            <h1>{{question?.title}}</h1>\n\n            <ion-icon style="font-size:23px;margin-top:-6px;" name="information-circle"></ion-icon>\n\n          </button>\n\n        </ion-card-title>\n\n              <ion-grid>\n\n                <ion-row >\n\n                    <ion-col *ngFor="let number of [1,2,3,4,5]" >\n\n                      <button ion-button clear icon-only (click)="sendAnwers(question.id,number)">\n\n                        <img *ngIf="number === activedIcon[question.id] || isFlagActive[question.id]" src="assets/images/iconsQuestions/icon{{number}}.svg" class="icon">\n\n                        <img *ngIf="number !== activedIcon[question.id] && !isFlagActive[question.id]" src="assets/images/iconsQuestions/icon{{number}}.svg" class="icon grayscale">\n\n                      </button>\n\n                    </ion-col>\n\n                </ion-row>\n\n              </ion-grid>\n\n        </ion-card>\n\n      </div>\n\n      <button ion-button color="primary" (click)="confirmAnswers()" (click)="updatePage()" block>\n\n        Enviar\n\n      </button>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\1513 IRON\Desktop\app\src\pages\questions\questions.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */]])
    ], QuestionsPage);
    return QuestionsPage;
}());

//# sourceMappingURL=questions.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_edit_telephone_edit_telephone__ = __webpack_require__(459);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserPage = (function () {
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
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__components_edit_telephone_edit_telephone__["a" /* EditTelephoneComponent */]).present();
    };
    UserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-user',template:/*ion-inline-start:"C:\Users\1513 IRON\Desktop\app\src\pages\user\user.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Dados</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-list>\n      <ion-item >\n        <ion-label >Nome: {{user?.name}}</ion-label>\n      </ion-item>\n\n      <ion-item>\n        <ion-label >E-mail: {{user?.email}}</ion-label>\n      </ion-item>\n\n      <ion-item>\n        <ion-label >Telefone: {{user?.telephone}}</ion-label>\n      </ion-item>\n\n      <ion-item>\n        <ion-label >Outro Telefone: {{user?.telephoneOther}}</ion-label>\n      </ion-item>\n    </ion-list>\n    <button ion-button color="primary" block (click)=\'openModal()\'>\n      Editar telefones\n    </button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\1513 IRON\Desktop\app\src\pages\user\user.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], UserPage);
    return UserPage;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditTelephoneComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditTelephoneComponent = (function () {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'edit-telephone',template:/*ion-inline-start:"C:\Users\1513 IRON\Desktop\app\src\components\edit-telephone\edit-telephone.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Editar telefones\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label >Telefone atual: {{user?.telephone}}</ion-label>\n    </ion-item>\n    <ion-input type="text" placeholder="Digite o seu novo telefone" #telephone ></ion-input>\n\n    <ion-item>\n      <ion-label >Outro Telefone atual: {{user?.telephoneOther}}</ion-label>\n    </ion-item>\n\n    <ion-input type="text" placeholder="Digite o telefone novo" #telephoneOther ></ion-input>\n  </ion-list>\n  <button ion-button color="primary" block (click)="dismiss()" (click)="updateOtherTelephone(telephoneOther.value)" (click)="updateTelephone(telephone.value)">\n    Salvar novos telefones\n  </button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\1513 IRON\Desktop\app\src\components\edit-telephone\edit-telephone.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_service__["a" /* UserService */]])
    ], EditTelephoneComponent);
    return EditTelephoneComponent;
}());

//# sourceMappingURL=edit-telephone.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(465);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_gamification_gamification__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_questions_questions__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_navigation_tabs_navigation__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_user_user__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_auth_service__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_user_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_edit_telephone_edit_telephone__ = __webpack_require__(459);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var firebaseConfig = {
    apiKey: "AIzaSyAL-OyrHkTqw4j4sgcapSnFKi0wFc61dNo",
    authDomain: "connect-48f5c.firebaseapp.com",
    databaseURL: "https://connect-48f5c.firebaseio.com",
    projectId: "connect-48f5c",
    storageBucket: "connect-48f5c.appspot.com",
    messagingSenderId: "882656858836"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__pages_gamification_gamification__["a" /* GamificationPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_questions_questions__["a" /* QuestionsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */],
                __WEBPACK_IMPORTED_MODULE_14__components_edit_telephone_edit_telephone__["a" /* EditTelephoneComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */]),
                __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["b" /* AngularFireDatabaseModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__pages_gamification_gamification__["a" /* GamificationPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_questions_questions__["a" /* QuestionsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */],
                __WEBPACK_IMPORTED_MODULE_14__components_edit_telephone_edit_telephone__["a" /* EditTelephoneComponent */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_12__providers_auth_service__["a" /* AuthService */], { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }, __WEBPACK_IMPORTED_MODULE_13__providers_user_service__["a" /* UserService */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_home_home__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_user_user__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_service__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, af) {
        this.platform = platform;
        this.af = af;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        this.pagesMenu = [
            { title: 'Meus Dados', component: __WEBPACK_IMPORTED_MODULE_4__pages_user_user__["a" /* UserPage */], icon: 'person' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["c" /* StatusBar */].styleDefault();
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* Splashscreen */].hide();
        });
    };
    MyApp.prototype.logOut = function () {
        var _this = this;
        new Promise(function () { return _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */]); })
            .then(function () { return _this.af.logOut(); });
    };
    MyApp.prototype.goToOtherPage = function (page) {
        this.navCtrl.push(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('homeNav'),
        __metadata("design:type", Object)
    ], MyApp.prototype, "navCtrl", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\1513 IRON\Desktop\app\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n       <!-- <button ion-item *ngFor="let p of pagesMenu" (click)="goToOtherPage(p)" menuToggle>\n        <ion-icon name="{{p.icon}}"></ion-icon>\n        {{p.title}}\n      </button> -->\n      <button ion-item *ngFor="let p of pagesMenu" (click)="goToOtherPage(p)" menuToggle>\n       <ion-icon name="{{p.icon}}"></ion-icon>\n       {{p.title}}\n     </button>\n      <button ion-item (click)="logOut()" menuToggle>\n       <ion-icon name="log-out"></ion-icon>\n       Sair\n     </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n<ion-nav #homeNav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"C:\Users\1513 IRON\Desktop\app\src\app\app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__providers_user_service__["a" /* UserService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6__providers_auth_service__["a" /* AuthService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = (function () {
    function UserService(db, authService) {
        this.db = db;
        this.authService = authService;
    }
    UserService.prototype.updateTelephone = function (newTelephone) {
        var _this = this;
        return new Promise(function (resolve) {
            return _this.getUser().then(function (_user) {
                _this.db.object("/" + _user.uidCT + "/users/" + _user.id)
                    .update({ telephone: newTelephone });
                resolve();
            });
        });
    };
    UserService.prototype.updateOtherTelephone = function (newTelephone) {
        var _this = this;
        return new Promise(function (resolve) {
            return _this.getUser().then(function (_user) {
                _this.db.object("/" + _user.uidCT + "/users/" + _user.id)
                    .update({ telephoneOther: newTelephone });
                resolve();
            });
        });
    };
    UserService.prototype.setRanking = function (quantity) {
        var _this = this;
        this.getUser().then(function (_user) {
            quantity += _user.gamification[0]['quantity'];
            _this.db.object("/" + _user.uidCT + "/users/" + _user.id + "/gamification/0/quantity").set(quantity);
            _this.db.object("/rankingGlobal/" + _user.id).update({ quantity: quantity, username: _user.name });
        });
    };
    UserService.prototype.setQuestionAnswered = function (_questionsAnwered) {
        var _this = this;
        return new Promise(function (resolve) {
            return _this.getUser().then(function (_user) {
                for (var i in _questionsAnwered)
                    _this.db.object("/" + _user.uidCT + "/users/" + _user.id + "/questions/" + _questionsAnwered[i].questionID)
                        .update({ isActive: false });
                resolve();
            });
        });
    };
    UserService.prototype.getQuantityPointsRanking = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return _this.getUser().then(function (_user) {
                _this.db.object("/rankingGlobal/" + _user.id).subscribe(function (quantityObject) { return resolve(quantityObject['quantity']); });
            });
        });
    };
    UserService.prototype.getPositionRanking = function () {
        var _this = this;
        var position = 1;
        return new Promise(function (resolve) {
            return _this.authService.getUID().then(function (_uidDQ) {
                _this.db.list("/rankingGlobal").subscribe(function (_listDQs) {
                    _this.getQuantityPointsRanking().then(function (quantity) {
                        _listDQs.forEach(function (_DQ) {
                            if (_uidDQ === _DQ['$key']) { }
                            else {
                                if (_DQ['quantity'] <= quantity)
                                    position++;
                            }
                        });
                        if (position === 1)
                            position = 0;
                        resolve(Math.trunc((position / _listDQs.length) * 100));
                    });
                });
            });
        });
    };
    UserService.prototype.getUser = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.authService.getUID().then(function (_uidDQ) {
                return _uidDQ;
            }).then(function (_uidDQ) {
                _this.listOfCTs$ = _this.db.list("/");
                _this.listOfCTs$.subscribe(function (_CTs) {
                    _CTs.forEach(function (_DQs) {
                        if (_DQs['users'] != undefined)
                            if (_DQs['users'][_uidDQ] != undefined)
                                resolve(_DQs['users'][_uidDQ]);
                    });
                });
            });
        });
    };
    UserService.prototype.getFirstAnswer = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getUser().then(function (_user) {
                _this.db.list("/" + _user.uidCT + "/users/" + _user.id + "/answers/0")
                    .subscribe(function (_listAnwers) {
                    resolve(_listAnwers[0]);
                });
            });
        });
    };
    UserService.prototype.pushAnswers = function (answers) {
        var _this = this;
        this.getUser().then(function (_user) {
            answers.forEach(function (answer) {
                _this.db.list("/" + _user.uidCT + "/users/" + _user.id + "/answers/" + answer.questionID + "/").push(answer);
            });
        });
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]])
    ], UserService);
    return UserService;
}());

//# sourceMappingURL=user.service.js.map

/***/ })

},[460]);
//# sourceMappingURL=main.js.map