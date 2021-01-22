import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {soon_text, soon_title} from "../../../global";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotToPage(route: string): void {
    this.router.navigate([route]);
  }

  goToPlaceholderPage(): void {
    this.router.navigate(['/soon'], { queryParams: { title: soon_title, text: soon_text } });
  }

}
