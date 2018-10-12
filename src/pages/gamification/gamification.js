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
import { NavController, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user.service';
import { AlertService } from "../../providers/alert.service";
var GamificationPage = /** @class */ (function () {
    function GamificationPage(navCtrl, alertCtrl, userService, alertService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.alertService = alertService;
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
    // Send the nickname to the DB, and then refreshes the local app.
    GamificationPage.prototype.requestChangeNickname = function (nick) {
        var _this = this;
        this.userService.updateNickname(nick).then(function () { return _this.getGamificatios(); });
    };
    GamificationPage.prototype.requestUpdateLevel = function (level) {
        var _this = this;
        this.userService.updateLevel(level).then(function () { return _this.getGamificatios(); });
    };
    GamificationPage.prototype.requestChangeIcon = function (iconn) {
        var _this = this;
        this.userService.updateIcon(iconn).then(function () { return _this.getGamificatios(); });
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
                _this.userNickname = DQ.nickname;
                _this.userLevel = DQ.nivel;
                _this.iconi = DQ.usericon;
                _this.uid = DQ.uidCT;
                _this.onContentLoaded();
                _this.onLoadedContent();
                _this.loadedContent();
            });
            _this.userService.getPositionRanking().then(function (position) { return _this.positionRanking = position; });
            _this.userService.getCT().then(function (ct) { _this.team = ct.username; });
            _this.teamRanking = _this.getTeamScore();
            resolve();
        });
    };
    GamificationPage.prototype.loadedContent = function () {
        var _this = this;
        this.userService.getUser().then(function (user) {
            if (user.usericon === undefined) {
                var icons = 'https://firebasestorage.googleapis.com/v0/b/connect-48f5c.appspot.com/o/icons8-cristiano-ronaldo-100.png?alt=media&token=2aca139d-7b55-4b8f-a693-6458c2706670';
                _this.requestChangeIcon(icons);
            }
        });
    };
    GamificationPage.prototype.checkNicknameIsValid = function (nick) {
        return !(nick == "" || nick.replace(/\s/g, '') == "");
    };
    GamificationPage.prototype.getLevel = function (ptos) {
        var lvl = 'Pelada na Rua';
        if (ptos >= 0 && ptos < 150) {
            lvl = 'Pelada na Rua';
        }
        if (ptos > 150 && ptos < 200) {
            lvl = 'Campeonato da Cidade';
        }
        if (ptos > 200 && ptos < 350) {
            lvl = 'Campeonato Estadual';
        }
        if (ptos > 350 && ptos < 450) {
            lvl = 'Campeonato Brasileiro';
        }
        if (ptos > 450 && ptos < 550) {
            lvl = 'Libertadores';
        }
        if (ptos > 550 && ptos < 650) {
            lvl = 'Liga Europa';
        }
        if (ptos > 650 && ptos < 750) {
            lvl = 'Liga dos Campeões';
        }
        if (ptos > 750 && ptos < 850) {
            lvl = 'Copa das Confederações';
        }
        if (ptos > 850 && ptos < 950) {
            lvl = 'Olimpíadas';
        }
        if (ptos > 950 && ptos < 1100) {
            lvl = 'Copa do Mundo';
        }
        return lvl;
    };
    GamificationPage.prototype.onLoadedContent = function () {
        var _this = this;
        this.userService.getUser().then(function (user) {
            if (user.nivel === undefined) {
                var niveu = '1';
                _this.requestUpdateLevel(niveu);
            }
            var oldLevel = user.nivel;
            var rk = user.gamification[0];
            var gols = rk.quantity;
            var newLevel = _this.getLevel(gols);
            if (oldLevel != newLevel) {
                _this.requestUpdateLevel(newLevel);
                _this.alertService.createAlertOK('Passou de nível!', "Parabéns " + _this.userNickname + "! Você agora está jogando o campeonato: <br> <br>" + newLevel + ". <br> <br> Continue marcando gols para ser promovido!", function () { });
            }
        });
    };
    // Each time the getGamifications is finished, this function is called
    GamificationPage.prototype.onContentLoaded = function () {
        var _this = this;
        this.userService.getUser().then(function (user) {
            if (user.nickname === undefined) {
                var criar_nick = function (data) {
                    _this.alertService.createAlertInputs('Criar Apelido', 'Por favor, digite o seu apelido no campo abaixo:', 'Criar!', function (data) {
                        // AQUI VAMOS CRIAR NO BD
                        var nick = data[0];
                        _this.requestChangeNickname(nick);
                        _this.alertService.createAlertOK('Apelido criado', "Parabéns! Seu apelido " + nick + " foi criado!", function () { });
                    }, ['apelido']);
                };
                var nao_criar_nick = function (data) {
                    _this.alertService.createAlertOK('Criar Apelido', "Seu apelido será \"Jogador\". Você poderá mudar depois quando quiser.", function () { });
                };
                _this.alertService.createAlertYesNo("Criar Apelido", "O nosso sistema agora possui a função de apelidos!\nDeseja criar um agora?", "Sim", "Não", criar_nick, nao_criar_nick);
            }
        });
    };
    GamificationPage.prototype.onIconPressed = function () {
        var _this = this;
        this.alertService.showRadio(function (data) {
            var icone = data;
            _this.requestChangeIcon(icone);
            _this.alertService.createAlertOK('Ícone de Jogador Selecionado', "Parabéns " + _this.userNickname + "!  Seu ícone de jogador foi alterado com sucesso!", function () { });
        });
    };
    // Every time the 'Mudar Apelido' is pressed
    GamificationPage.prototype.onNicknamePressed = function (skipAsk) {
        var _this = this;
        if (skipAsk === void 0) { skipAsk = false; }
        var alterar_nick = function () {
            _this.alertService.createAlertInputs('Alterar apelido', 'Por favor, digite o seu novo apelido no campo abaixo:', 'Alterar!', function (data) {
                var nick = data[0];
                if (!_this.checkNicknameIsValid(nick)) {
                    _this.alertService.createAlertOK("Alterar apelido", "O apelido não pode ser vazio!", function () {
                        _this.onNicknamePressed(true);
                    });
                    return;
                }
                // Push the changes to the DataBase
                var old_nick = _this.userNickname;
                _this.requestChangeNickname(nick);
                _this.alertService.createAlertOK('Apelido criado', "Parabéns! Seu apelido \"" + old_nick + "\" foi alterado para \"" + nick + "\"!", function () { });
            }, ['apelido']);
        };
        var nao_alterar_nick = function () { };
        if (!skipAsk) {
            this.alertService.createAlertYesNo("Alterar apelido", "Deseja alterar seu apelido?", "Sim", "Não", alterar_nick, nao_alterar_nick);
        }
        else {
            alterar_nick();
        }
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
    GamificationPage.prototype.getUserTeam = function () {
        return Promise.all([
            this.userService.getUser(),
            this.userService.getAllTeams()
        ]).then(function (values) {
            var user = values[0];
            var teams = values[1];
            for (var _i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
                var team = teams_1[_i];
                if (team != undefined) {
                    if (team.id == user.uidCT) {
                        return team;
                    }
                }
            }
        });
    };
    GamificationPage.prototype.getTeamScore = function () {
        var _this = this;
        return new Promise(function () {
            _this.getUserTeam().then(function (team) {
                _this.userService.getTeamUsers(team).then(function (users) {
                    var total = 0;
                    Object.keys(users).forEach(function (key) {
                        var user = users[key];
                        total += user.gamification[0].quantity;
                    });
                    debugger;
                    return total;
                });
            });
        });
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
    GamificationPage.prototype.getStyleImgRankingTeam = function () {
        return {
            '-webkit-clip-path': "inset(" + (100 - this.positionRanking + 10) + "% 0px 0px 0px)",
            'clip-path': "inset(" + (100 - this.positionRanking - 10) + "% 0px 0px 0px)",
            'float': 'right'
        };
    };
    GamificationPage = __decorate([
        Component({
            selector: 'page-gamification',
            templateUrl: 'gamification.html'
        }),
        __metadata("design:paramtypes", [NavController,
            AlertController,
            UserService,
            AlertService])
    ], GamificationPage);
    return GamificationPage;
}());
export { GamificationPage };
//# sourceMappingURL=gamification.js.map