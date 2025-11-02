import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: true
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

// Por motivos de segurança, o Angular bloqueia automaticamente
//  qualquer URL que ele considere potencialmente insegura
// O Angular fornece uma classe chamada DomSanitizer que serve para "sanear"
//  (limpar e validar) valores potencialmente perigosos, garantindo que são seguros para uso no DOM.