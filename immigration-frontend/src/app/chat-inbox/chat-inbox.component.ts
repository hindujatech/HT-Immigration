import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
// import * as io from 'socket.io-client';
// import {io} from 'socket.io-client/build/index';
import { io, Socket } from 'socket.io-client';
import { ImmigrationService } from '../service/immigration.service';

const BACK_END_URL = 'https://immigration.hindujatech.com:3695/';
// const SOCKET_ENDPOINT = localhost:3000;
@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
  socket
  message: string;
  personalDetails: any;
  caht_obj:any;
  user:any;
  chat_emp:any;
  @Input('chatMessage') chatMessage: any;
  constructor(private immigrationService: ImmigrationService) {  }

  ngOnInit() {
    //console.log("sadsad",this.chatMessage);
    this.setupSocketConnection(); 
   
    this.personalDetails = new FormGroup({
      firstname: new FormControl("")
    });
  }
  setupSocketConnection() {
     this.socket = io(BACK_END_URL,{ transports : ['websocket'] });
    //  this.socket = io(SOCKET_ENDPOINT);
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.caht_obj = {
      emp_id:this.chatMessage.emp_id,
      chat_on:this.chatMessage.chat_on,
      emp_number:this.chatMessage.emp_number
    }
    this.socket.emit('message', this.caht_obj);
   this.chatresult();
  //  this.chatoutput();
  //  this.socket.send(this.chatMessage);
  }
  

  chatoutput(check_img_emp_id){
    this.socket.on('message-broadcast', (msg) => {
      console.log("sdsds",msg)
      if(msg.chat_on == 'img'){
        console.log("sdwedededee",check_img_emp_id, this.user.id);
         if(check_img_emp_id == this.user.id){
          const element = document.createElement('li');
          element.innerHTML = msg.message;
          element.style.background = 'white';
          element.style.padding =  '15px 30px';
          element.style.margin = '10px';
          document.getElementById('message-list').appendChild(element);
         }  
      }else if(msg.chat_on == 'emp'){
        this.chat_emp = JSON.parse(localStorage.getItem("chatEmpDetails"));
        console.log("ydyhgs",this.chat_emp.emp_Id,msg.emp_number)
        if(this.chat_emp.emp_Id == msg.emp_number){
          const element = document.createElement('li');
          element.innerHTML = msg.message;
          element.style.background = 'white';
          element.style.padding =  '15px 30px';
          element.style.margin = '10px';
          document.getElementById('message-list').appendChild(element);
        }  
      }
      
     
   });
  }

  chatresult(){
   // // this.socket = io(BACK_END_URL,{ transports : ['websocket'] });
   console.log("wadasfesfesfesfef")
    this.socket.on('message-output', (data) => {
      console.log("sdsds",data)
    if (data.length) {
      // data.forEach(result => {
        var result = data[0]
        console.log("result",result.chat)
        result.chat.forEach(res => {
          console.log("response",res.message)
          if(res.chat_on == 'img'){
            const element = document.createElement('li');
            element.innerHTML = res.message;
            element.style.background = 'white';
            element.style.padding =  '15px 30px';
            element.style.margin = '10px';
            element.style.textAlign = 'right';
            document.getElementById('message-list').appendChild(element);
          }else{
            const element = document.createElement('li');
            element.innerHTML = res.message;
            element.style.background = 'white';
            element.style.padding =  '15px 30px';
            element.style.margin = '10px';
            element.style.textAlign = 'left';
            document.getElementById('message-list').appendChild(element);
          }
       
        })
     }
   });
  }

   SendMessage() {
      // this.socket.emit('message', this.message);
      // this.message = '';
      this.caht_obj = {
        message:this.message,
        emp_id:this.chatMessage.emp_id,
        chat_on:this.chatMessage.chat_on,
        emp_number:this.chatMessage.emp_number
      }
      console.log("sadsad",this.caht_obj);
      this.socket.emit('message', this.caht_obj);
      const element = document.createElement('li');
      element.innerHTML = this.message;
      element.style.background = 'white';
      element.style.padding =  '15px 30px';
      element.style.margin = '10px';
      element.style.textAlign = 'right';
      document.getElementById('message-list').appendChild(element);
      this.message = '';
      this.immigrationService.chatEmployeeDetails(this.chatMessage.emp_id).subscribe((response: any) => {
        console.log("data",response);
        this.chatoutput(response.data[0].emp_number);
      })
      // this.chatresult();
      
   }

}
