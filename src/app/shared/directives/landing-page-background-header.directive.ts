import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReadService } from 'src/app/services/read.service';
import { GlobalConstants } from 'src/app/global-variables';

@Directive({
  selector: '[appLandingPageBackgroundHeader]',
})
export class LandingPageBackgroundHeaderDirective {
  constructor(
    private renderer2: Renderer2,
    private el: ElementRef,
    private readService: ReadService
  ) {
    this.addBG();
  }

  async addBG() {
    const l = await this.readService.returnPromiseWhere(
      `${GlobalConstants.corporateMiscImages}`,
      'imageTitle',
      'appLandingPageBackgroundHeader'
    );
    const [bg] = [...l];
    this.renderer2.setStyle(
      this.el.nativeElement,
      'background-image',
      `url(${bg.imageUrl})`
    );
  }
}
