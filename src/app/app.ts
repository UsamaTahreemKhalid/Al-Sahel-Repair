import { Component, signal, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';

declare var $: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('al-sahel-repair');
  public readonly isChatOpen = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Spinner removal
      setTimeout(() => {
        const spinner = document.getElementById('spinner');
        if (spinner) {
          spinner.classList.remove('show');
        }
      }, 1);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Back to top button
      $(window).scroll(() => {
        if ($(window).scrollTop() > 300) {
          $('.back-to-top').fadeIn('slow');
        } else {
          $('.back-to-top').fadeOut('slow');
        }
      });

      $('.back-to-top').on('click', () => {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
      });
    }
  }

  toggleChat() {
    this.isChatOpen.update(v => !v);
  }

  closeChat() {
    this.isChatOpen.set(false);
  }

  openWhatsAppDirect() {
    if (isPlatformBrowser(this.platformId)) {
      const defaultText = encodeURIComponent('Hi Al Sahel Repair! I would like to inquire about your AC repair and maintenance services.');
      window.open(`https://wa.me/971562475707?text=${defaultText}`, '_blank');
    }
  }
}
