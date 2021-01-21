import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
    this.router.navigate(['/soon'], { queryParams: { title: 'Bientôt disponible !', text: 'FoodOrigin se prépare au lancement vers la planète Androïd, restez à l\'affut !' } });
  }

}
