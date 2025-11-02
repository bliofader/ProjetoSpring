import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './sobre-nos.component.html',
  styleUrl: './sobre-nos.component.css'
})
export class SobreNosComponent {

}
