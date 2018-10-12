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
import { AlertController } from 'ionic-angular';
var AlertService = /** @class */ (function () {
    function AlertService(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    AlertService.prototype.createAlertRadio = function (title, bt_name, bt_callback) {
        var confirm = this.alertCtrl.create({
            title: title,
        });
    };
    // Creates a alert window with two buttons
    AlertService.prototype.createAlertYesNo = function (title, message, bt1_name, bt2_name, bt1_callback, bt2_callback) {
        var confirm = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: bt1_name,
                    handler: bt1_callback
                },
                {
                    text: bt2_name,
                    handler: bt2_callback
                }
            ]
        });
        confirm.present();
    };
    // Creates a text input window with custom button with a callback and a 'Cancelar' button
    AlertService.prototype.createAlertInputs = function (title, message, btdone_name, btdone_callback, inputs) {
        var confirm = this.alertCtrl.create({
            title: title,
            inputs: inputs,
            message: message,
            buttons: [
                {
                    text: btdone_name,
                    handler: btdone_callback
                },
                {
                    text: 'Cancelar'
                }
            ]
        });
        confirm.present();
    };
    // A simple OK alert window
    AlertService.prototype.createAlertOK = function (title, message, bt_callback) {
        var confirm = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'OK',
                    handler: bt_callback
                }
            ]
        });
        confirm.present();
    };
    AlertService.prototype.showRadio = function (bt_callback) {
        var alert = this.alertCtrl.create();
        alert.setTitle('Mude Seu Ícone de Jogador');
        alert.addInput({
            type: 'radio',
            label: 'Cristiano Ronaldo',
            value: 'https://firebasestorage.googleapis.com/v0/b/connect-48f5c.appspot.com/o/icons8-cristiano-ronaldo-100.png?alt=media&token=2aca139d-7b55-4b8f-a693-6458c2706670',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: 'Ronaldo Fenômeno',
            value: 'https://firebasestorage.googleapis.com/v0/b/connect-48f5c.appspot.com/o/icons8-ronaldo-100.png?alt=media&token=c720c783-e868-4d21-adfe-e3af748eb519',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Cartão Amarelo',
            value: 'https://firebasestorage.googleapis.com/v0/b/connect-48f5c.appspot.com/o/icons8-soccer-yellow-card-100.png?alt=media&token=10e2eaec-b05f-4740-b499-f38d5f781e1c',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Cartão Vermelho',
            value: 'https://firebasestorage.googleapis.com/v0/b/connect-48f5c.appspot.com/o/icons8-foul-100.png?alt=media&token=b172b6bb-1c79-44e2-b7ef-b7db480c9030',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Bola',
            value: 'https://firebasestorage.googleapis.com/v0/b/connect-48f5c.appspot.com/o/icons8-soccer-ball-100.png?alt=media&token=b39a38a3-e47a-4043-81d2-d2880d312c09',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Jogador de Futebol',
            value: 'https://firebasestorage.googleapis.com/v0/b/connect-48f5c.appspot.com/o/icons8-soccer-player-100.png?alt=media&token=47f5c0f7-b375-4c92-8ca4-99f43d651f2b',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Campo de Futebol',
            value: 'https://firebasestorage.googleapis.com/v0/b/connect-48f5c.appspot.com/o/icons8-stadium-100.png?alt=media&token=e3b4a929-39b6-4a00-9834-dfc73aa5586a',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Troféu da Copa',
            value: 'https://firebasestorage.googleapis.com/v0/b/connect-48f5c.appspot.com/o/icons8-world-cup-100.png?alt=media&token=0c85d206-643f-466b-8a3b-b9f3d29ee584',
            checked: false
        });
        alert.addButton({
            text: 'OK',
            handler: bt_callback
        });
        alert.addButton('Cancelar');
        alert.present();
    };
    AlertService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AlertController])
    ], AlertService);
    return AlertService;
}());
export { AlertService };
//# sourceMappingURL=alert.service.js.map