import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var $: any;
declare var WOW: any;

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styles: ``,
})
export class Home implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Facts counter
      $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
      });

      // Testimonials carousel
      $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
          '<i class="bi bi-chevron-left"></i>',
          '<i class="bi bi-chevron-right"></i>'
        ]
      });

      // Initiate the wowjs
      if (typeof WOW !== 'undefined') {
        new WOW().init();
      }
    }
  }

  onSubmitQuote(event: Event, name: string, email: string, mobile: string, service: string, message: string) {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const formattedMessage = `*Free Quote Request - AL SAHEL Repair*\n\n` +
        `*Name:* ${name.trim() || 'N/A'}\n` +
        `*Email:* ${email.trim() || 'N/A'}\n` +
        `*Mobile:* ${mobile.trim() || 'N/A'}\n` +
        `*Service:* ${service.trim() || 'N/A'}\n` +
        `*Message:* ${message.trim() || 'N/A'}`;
      
      const whatsappUrl = `https://wa.me/971562475707?text=${encodeURIComponent(formattedMessage)}`;
      window.open(whatsappUrl, '_blank');

      // Reset the form after submitting
      const form = event.target as HTMLFormElement;
      if (form) {
        form.reset();
      }
    }
  }
}
