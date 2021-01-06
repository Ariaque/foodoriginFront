import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-sending-confirmation',
  templateUrl: './success-page.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPagecomponent implements OnInit {

  url: URL;
  title: string;
  text: string;

  constructor() { }

  ngOnInit(): void {
    this.url = new URL(window.location.href);
    this.title =  this.url.searchParams.get('title');
    this.text =  this.url.searchParams.get('text');
  }

}
