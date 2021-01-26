import { Component, OnInit } from '@angular/core';

/**
 * Component that represents the error page
 */
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
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
