import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-sideabr',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-sideabr.component.html',
  styleUrl: './user-sideabr.component.css'
})
export class UserSideabrComponent {
  
  constructor(private router: Router) {}

}
