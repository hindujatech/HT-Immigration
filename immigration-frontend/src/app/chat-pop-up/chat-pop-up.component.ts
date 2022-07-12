import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-pop-up',
  templateUrl: './chat-pop-up.component.html',
  styleUrls: ['./chat-pop-up.component.css']
})
export class ChatPopUpComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
