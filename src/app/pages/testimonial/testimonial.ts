import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var WOW: any;
declare var $: any;

@Component({
  selector: 'app-testimonial',
  imports: [RouterLink],
  templateUrl: './testimonial.html',
  styles: ``,
})
export class Testimonial implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof WOW !== 'undefined') {
        new WOW().init();
      }
      if (typeof $ !== 'undefined') {
        $('.testimonial-carousel').owlCarousel({
          autoplay: true,
          smartSpeed: 1000,
          items: 1,
          dots: false,
          loop: true,
          nav: true,
          navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>',
          ],
        });
      }
    }
  }
}
