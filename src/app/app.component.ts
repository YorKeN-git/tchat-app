import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from './modeles/message';
import { TchatService } from './services/tchat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tchat-app';
  message: string;
  messages: string[] = [];
  messageForm: FormGroup;
  pseudo: string = "";
  isValider: boolean = false; 
  isPseudoOK: boolean = false;

  constructor(private tchatservice: TchatService){}
  
  sendMessage() {
    let messageUser = new Message();
    messageUser.body = this.message; 
    messageUser.pseudo = this.pseudo;
    let heure = new Date();
    messageUser.heure = heure.toLocaleTimeString();
    //console.log(messageUser.heure);
    this.tchatservice.sendMessage(messageUser);
    document.getElementById("zoneSaisie").value = "";
    this.message = '';
  }

  ngOnInit() {
    this.tchatservice
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }

  validerPseudo(){
    //Erreur mais n'empeche pas le bon fonctionnement
    this.pseudo = document.getElementById('pseudo').value ;
    this.isValider = true; 
    this.isPseudoOK = true;
  }
}
