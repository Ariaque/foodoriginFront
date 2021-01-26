import { Component, OnInit } from '@angular/core';

/**
 * Component that represents the page that appears after that a user click on "Téléchargement Android" button on the home page
 */

@Component({
  selector: 'app-placeholder-page',
  templateUrl: './placeholder-page.component.html',
  styleUrls: ['./placeholder-page.component.css']
})
export class PlaceholderPageComponent implements OnInit {

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
