var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
var UserService = /** @class */ (function () {
    function UserService(db, authService) {
        this.db = db;
        this.authService = authService;
    }
    // updateNickname: Every time the nickname needs to be updated
    UserService.prototype.updateNickname = function (nick) {
        var _this = this;
        return new Promise(function (resolve) {
            return _this.getUser().then(function (_user) {
                _this.db.object("/" + _user.uidCT + "/users/" + _user.id)
                    .update({ nickname: nick });
                resolve();
            });
        });
    };
    UserService.prototype.updateLevel = function (level) {
        var _this = this;
        return new Promise(function (resolve) {
            return _this.getUser().then(function (_user) {
                _this.db.object("/" + _user.uidCT + "/users/" + _user.id)
                    .update({ nivel: level });
                resolve();
            });
        });
    };
    UserService.prototype.updateIcon = function (icone) {
        var _this = this;
        return new Promise(function (resolve) {
            return _this.getUser().then(function (_user) {
                _this.db.object("/" + _user.uidCT + "/users/" + _user.id)
                    .update({ usericon: icone });
                resolve();
            });
        });
    };
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
                _this.db.object("/rankingGlobal/" + _user.id).valueChanges().subscribe(function (quantityObject) { return resolve(quantityObject['quantity']); });
            });
        });
    };
    UserService.prototype.getPositionRanking = function () {
        var _this = this;
        var position = 1;
        return new Promise(function (resolve) {
            return _this.authService.getUID().then(function (_uidDQ) {
                _this.db.list("/rankingGlobal").valueChanges().subscribe(function (_listDQs) {
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
                _this.listOfCTs$.valueChanges().subscribe(function (_CTs) {
                    _CTs.forEach(function (_DQs) {
                        if (_DQs['users'] != undefined)
                            if (_DQs['users'][_uidDQ] != undefined)
                                resolve(_DQs['users'][_uidDQ]);
                    });
                });
            });
        });
    };
    UserService.prototype.getCT = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.authService.getUID().then(function (_uidDQ) {
                return _uidDQ;
            }).then(function (_uidDQ) {
                _this.listOfCTs$ = _this.db.list("/");
                _this.listOfCTs$.valueChanges().subscribe(function (_CTs) {
                    _CTs.forEach(function (_DQs) {
                        if (_DQs['users'] != undefined)
                            if (_DQs['users'][_uidDQ] != undefined)
                                resolve(_DQs['data']);
                    });
                });
            });
        });
    };
    UserService.prototype.getAllTeams = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.listOfCTs$ = _this.db.list("/");
            _this.listOfCTs$.valueChanges().subscribe(function (_CTs) {
                var arr = [];
                _CTs.forEach(function (ct) {
                    if (ct['data'] != undefined)
                        arr.push(ct['data']);
                });
                resolve(arr);
            });
        });
    };
    UserService.prototype.getTeamUsers = function (team) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.listOfCTs$ = _this.db.list("/");
            _this.listOfCTs$.valueChanges().subscribe(function (_CTs) {
                _CTs.forEach(function (ct) {
                    if (ct['data']['id'] == team.id && ct['users'] != undefined) {
                        var arr = ct['users'];
                        resolve(arr);
                    }
                });
            });
        });
    };
    UserService.prototype.getFirstAnswer = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getUser().then(function (_user) {
                _this.db.list("/" + _user.uidCT + "/users/" + _user.id + "/answers/0")
                    .valueChanges();
            });
        });
    };
    UserService.prototype.pushAnswers = function (answers) {
        var _this = this;
        this.getUser().then(function (_user) {
            answers.forEach(function (answer) {
                console.log(answer.date);
                console.log(answer.date.toString());
                // answer.date = answer.date
                _this.db.list("/" + _user.uidCT + "/users/" + _user.id + "/answers/" + answer.questionID + "/").push(answer);
            });
        });
    };
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireDatabase,
            AuthService])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map