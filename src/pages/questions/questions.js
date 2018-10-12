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
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';
import { UserService } from '../../providers/user.service';
var QuestionsPage = /** @class */ (function () {
    function QuestionsPage(alertCtrl, navCtrl, loadingCtrl, userService) {
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
        this.shouldLoadMore = false;
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
    QuestionsPage.prototype.showMore = function () {
        this.shouldLoadMore = !this.shouldLoadMore;
        return new Promise(function (resolve) {
            resolve();
        });
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
        var date = new Date();
        this.activedIcon[questionID] = answersNumber;
        this.isFlagActive[questionID] = false;
        this.answers[questionID] = { questionID: questionID, answersNumber: answersNumber, date: date };
    };
    QuestionsPage.prototype.sendNotification = function () {
        var dateMoment = new Date();
        LocalNotifications.schedule({
            id: 1,
            text: 'Seu time precisa de você! Responda as perguntas e marque gols!',
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
                _this.userService.setRanking(quantityAnwersRanking * (_this.shouldLoadMore ? 1 : 5));
                _this.alertDescription("Respostas enviadas", "Voc\u00EA ganhou " + quantityAnwersRanking * (_this.shouldLoadMore ? 1 : 5) + " pontos", "no ranking");
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
        Component({
            selector: 'page-questions',
            templateUrl: 'questions.html'
        }),
        __metadata("design:paramtypes", [AlertController,
            NavController,
            LoadingController,
            UserService])
    ], QuestionsPage);
    return QuestionsPage;
}());
export { QuestionsPage };
//# sourceMappingURL=questions.js.map