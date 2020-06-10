import { Component, OnInit  } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Gamification } from './gamification.model';
import { UserService } from '../../providers/user.service';
import { User } from '../user/user.model';
import { Ct } from '../user/ct.model';
import { AlertService } from "../../providers/alert.service";

@Component({
  selector: 'page-gamification',
  templateUrl: 'gamification.html'
})
export class GamificationPage implements OnInit {

  ranking: Gamification;
  ribbonsCareers: Gamification[] = [];
  ribbonsTopScore: Gamification[] = [];
  positionRanking: number;
  teamRanking: number;
  teamTotalPoints: number;
  daysCurrent: number = 0;
  heightTrophys: number = 40;
  userNickname: string;
  userLevel: string;
  iconi: string;
  uid: string;
  team:string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private userService: UserService,
              public alertService: AlertService) {
  }

  ngOnInit() {
    this.getGamificatios();
  }

  onLoad(img) {
    this.heightTrophys += img.height;
  }

  // Send the nickname to the DB, and then refreshes the local app.
  requestChangeNickname(nick){
    this.userService.updateNickname(nick).then(() => this.getGamificatios());
  }

  requestUpdateLevel(level){
    this.userService.updateLevel(level).then(() => this.getGamificatios());
  }

  requestChangeIcon(iconn){
    this.userService.updateIcon(iconn).then(() => this.getGamificatios());
  }

  getGamificatios(): Promise<any> {
    return new Promise(resolve =>{
      this.userService.getUser().then((DQ:User) => {
        this.ranking = DQ.gamification[0];
        for (let i = 0; i <= 5; i++)
          this.ribbonsCareers[i] = DQ.gamification[i+1];

        for (let i = 0; i <= 1; i++)
          this.ribbonsTopScore[i] = DQ.gamification[i+7];

        this.daysCurrent = DQ.gamification[9]['quantity'];
        this.userNickname = DQ.nickname;
        this.userLevel = DQ.nivel;
        this.iconi = DQ.usericon;
        this.uid = DQ.uidCT;
        this.onContentLoaded();
        this.onLoadedContent();
        this.loadedContent();
      });
      this.userService.getPositionRanking().then((position: number) => this.positionRanking = position);
      this.userService.getCT().then((ct) => { this.team = ct.username})
      this.getOverallScore().then((team_points) => {this.teamRanking = Math.round(team_points[0]); this.teamTotalPoints = team_points[1];})

      resolve();
    });
  }

  loadedContent(){
    this.userService.getUser().then((user) => {
      if(user.usericon === undefined) {
        let icons = 'https://firebasestorage.googleapis.com/v0/b/connect-48f5c.appspot.com/o/icons8-cristiano-ronaldo-100.png?alt=media&token=2aca139d-7b55-4b8f-a693-6458c2706670'
        this.requestChangeIcon(icons);
      }
    })
  }

  checkNicknameIsValid(nick): boolean {
    return !(nick == "" || nick.replace(/\s/g,'') == "");
  }

  getLevel(ptos) {
    let lvl = 'Pelada na Rua';
    if(ptos >= 0 && ptos < 400){
      lvl = 'Pelada na Rua';
    }
    if(ptos > 400 && ptos < 900){
      lvl = 'Campeonato da Cidade';
    }
    if(ptos > 900 && ptos < 1500){
      lvl = 'Campeonato Estadual';
    }
    if(ptos > 1500 && ptos < 2200){
      lvl = 'Campeonato Brasileiro';
    }
    if(ptos > 2200 && ptos < 3200){
      lvl = 'Libertadores';
    }
    if(ptos > 3200 && ptos < 3900){
      lvl = 'Liga Europa';
    }
    if(ptos > 3900 && ptos < 4500){
      lvl = 'Liga dos Campeões';
    }
    if(ptos > 4500 && ptos < 5000){
      lvl = 'Copa das Confederações';
    }
    if(ptos > 5000 && ptos < 5400){
      lvl = 'Olimpíadas';
    }
    if(ptos > 5400){
      lvl = 'Copa do Mundo';
    }
    return lvl;
  }


  onLoadedContent() {
    this.userService.getUser().then((user) => {
      if(user.nivel === undefined) {
        let niveu = '1'
        this.requestUpdateLevel(niveu);
      }
      let oldLevel = user.nivel;
      let rk = user.gamification[0];
      let gols = rk.quantity;
      let newLevel = this.getLevel(gols);

      if (oldLevel != newLevel){
        this.requestUpdateLevel(newLevel);
        this.alertService.createAlertOK('Passou de nível!', "Parabéns " + this.userNickname + "! Você agora está jogando o campeonato: <br> <br>" + newLevel + ". <br> <br> Continue marcando gols para ser promovido!", () => {})
      }
    })
  }

  // Each time the getGamifications is finished, this function is called
  onContentLoaded() {
    this.userService.getUser().then((user) => {
      if (user.nickname === undefined) {
        let criar_nick = (data) => {
          this.alertService.createAlertInputs('Criar Apelido', 'Por favor, digite o seu apelido no campo abaixo:', 'Criar!', (data) => {
            // AQUI VAMOS CRIAR NO BD
            let nick = data[0];

            this.requestChangeNickname(nick);
            this.alertService.createAlertOK('Apelido criado', "Parabéns! Seu apelido " + nick + " foi criado!", () => {})

          }, ['apelido'])
        };

        let nao_criar_nick = (data) =>{
          this.alertService.createAlertOK('Criar Apelido', "Seu apelido será \"Jogador\". Você poderá mudar depois quando quiser.", () => {})
          this.requestChangeNickname("Jogador");
        };
        this.alertService.createAlertYesNo("Criar Apelido", "O nosso sistema agora possui a função de apelidos!\nDeseja criar um agora?", "Sim", "Não", criar_nick, nao_criar_nick)
      }
    })
  }


  onIconPressed(){
    this.alertService.showRadio((data) => {
      let icone = data;
      this.requestChangeIcon(icone);
      this.alertService.createAlertOK('Ícone de Jogador Selecionado', "Parabéns " + this.userNickname + "!  Seu ícone de jogador foi alterado com sucesso!", () => {})
    });
  }

  // Every time the 'Mudar Apelido' is pressed
  onNicknamePressed(skipAsk = false) {
    let alterar_nick = () => {
      this.alertService.createAlertInputs('Alterar apelido', 'Por favor, digite o seu novo apelido no campo abaixo:', 'Alterar!', (data) => {

        let nick = data[0];

        if (!this.checkNicknameIsValid(nick)){
            this.alertService.createAlertOK("Alterar apelido", "O apelido não pode ser vazio!", () => {
              this.onNicknamePressed(true);
            });

        return;
      }

        // Push the changes to the DataBase
        let old_nick = this.userNickname;
        this.requestChangeNickname(nick);
        this.alertService.createAlertOK('Apelido criado', "Parabéns! Seu apelido \"" + old_nick + "\" foi alterado para \"" + nick + "\"!", () => {})

      }, ['apelido'])
    };

    let nao_alterar_nick = () => {};

    if (!skipAsk) {
      this.alertService.createAlertYesNo("Alterar apelido", "Deseja alterar seu apelido?", "Sim", "Não", alterar_nick, nao_alterar_nick)
    } else {
      alterar_nick();
    }
  }

  doRefresh(refresher) {
    this.getGamificatios().then(() => refresher.complete());
  }

  alertDescription(title:string, description?: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: description,
      buttons: [
        'Fechar'
      ]
    });
    alert.present();
  }

  getOverallScore(): Promise<number[]> {
    return Promise.all([
      this.userService.getUser(),
      this.userService.getAllTeamsData()
    ]).then(values => {
      let user: User = values[0];
      let teams_data = values[1];
      let user_team = undefined;
      let user_team_score = undefined;
      let under_teams = 0;
      let scores = {}
      for (let team_data of teams_data) {
        let team: Ct = team_data['data']
        let users: User[] = team_data['users']
        let total = this.getTeamTotalScore(team, users);
        if (total != undefined) {
          scores[team.id] = total;
        }
        if (team.id == user.uidCT) {
          user_team = team;
          user_team_score = scores[user_team.id];
        }
      }
      for (let score_key of Object.keys(scores)) {
        let score = scores[score_key];
        if (score < user_team_score) {
          under_teams++;
        }
      }
      return [(100 * (under_teams / Object.keys(scores).length)), user_team_score];
    });
  }

  getTeamTotalScore(team: Ct, users: User[]): number {
    let total = 0;

    if (users == undefined || team == undefined) return undefined;
    Object.keys(users).forEach(function (key) {
      let user = users[key];
      if (user.gamification != undefined) {
        total += user.gamification[0].quantity;
      }
    })

    return total;
  }

  getStyleImgTrophy() {
    return {
      '-webkit-clip-path': `inset(0px ${100-(this.daysCurrent/365*100)}% 0px 0px)`,
      'clip-path': `inset(0px ${100-(this.daysCurrent/365*100)}% 0px 0px)`,
      'float': 'right'}
  }

  getStyleImgRanking() {
    return {
      '-webkit-clip-path': `inset(${100-this.positionRanking}% 0px 0px 0px)`,
      'clip-path': `inset(${100-this.positionRanking}% 0px 0px 0px)`,
      'float': 'right'}
  }

  getStyleImgRankingTeam() {
    return {
      '-webkit-clip-path': `inset(${100-this.teamRanking}% 0px 0px 0px)`,
      'clip-path': `inset(${100-this.teamRanking}% 0px 0px 0px)`,
      'float': 'right'}
  }
}
