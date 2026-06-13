import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './header.html',
  styles: ``,
})
export class Header implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Sticky Navbar
      $(window).scroll(() => {
        if ($(window).scrollTop() > 300) {
          $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
          $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
      });
    }
  }

  closeNavbar() {
    if (isPlatformBrowser(this.platformId)) {
      const navbarCollapse = $('#navbarCollapse');
      if ($('.navbar-toggler').is(':visible') && navbarCollapse.hasClass('show')) {
        navbarCollapse.collapse('hide');
      }
    }
  }
}
