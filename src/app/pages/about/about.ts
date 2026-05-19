import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var $: any;
declare var WOW: any;

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styles: ``,
})
export class About implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Facts counter
      $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
      });

      // Initiate the wowjs
      if (typeof WOW !== 'undefined') {
        new WOW().init();
      }
    }
  }
}
