import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var WOW: any;

@Component({
  selector: 'app-feature',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './feature.html',
  styles: ``,
})
export class Feature implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof WOW !== 'undefined') {
        new WOW().init();
      }
    }
  }
}
