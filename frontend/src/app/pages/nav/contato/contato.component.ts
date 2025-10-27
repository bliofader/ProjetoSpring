import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

}
