import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var WOW: any;

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.html',
  styles: ``,
})
export class Contact implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof WOW !== 'undefined') {
        new WOW().init();
      }
    }
  }

  onSubmitContact(event: Event, name: string, email: string, subject: string, message: string) {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const formattedMessage = `*New Query - AL SAHEL Repair*\n\n` +
        `*Name:* ${name.trim() || 'N/A'}\n` +
        `*Email:* ${email.trim() || 'N/A'}\n` +
        `*Subject:* ${subject.trim() || 'N/A'}\n` +
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
