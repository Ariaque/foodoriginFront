import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {soon_text, soon_title} from '../../../global';

/**
 * Component that represents the "Accueil" page
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Manages redirection in the file
   * @param route
   */
  gotToPage(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Manages redirection when a user click on "Téléchargement Androïd" button in the home page
   */
  goToPlaceholderPage(): void {
    this.router.navigate(['/soon'], { queryParams: { title: soon_title, text: soon_text } });
  }

}
