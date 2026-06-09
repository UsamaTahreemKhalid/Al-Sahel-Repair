import { Component, signal, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('al-sahel-repair');
  public readonly isChatOpen = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
    private titleService: Title
  ) {}

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

    // Dynamic SEO Meta Tag Update on routing
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      
      const description = route.snapshot.data['description'] || 'Expert AC repair in Sharjah, Ajman, and Dubai. AL SAHEL Repair provides professional AC maintenance, washing machine repair, and refrigerator repair services. Fast 24/7 emergency response and affordable rates.';
      const keywords = route.snapshot.data['keywords'] || 'AC repair Sharjah, AC repair Ajman, AC repair Dubai, AC maintenance Sharjah, AC maintenance Ajman, AC maintenance Dubai, AC service Sharjah, washing machine repair Dubai, refrigerator repair Sharjah, AL SAHEL Repair';
      
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ name: 'keywords', content: keywords });
      
      // Update canonical URL in browser
      if (isPlatformBrowser(this.platformId)) {
        let canonicalUrl = 'https://al-sahel-repair.ae' + this.router.url;
        // Clean trailing slashes
        if (canonicalUrl.endsWith('/') && canonicalUrl.length > 27) {
          canonicalUrl = canonicalUrl.slice(0, -1);
        }
        
        let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
        if (link) {
          link.setAttribute('href', canonicalUrl);
        } else {
          link = document.createElement('link');
          link.setAttribute('rel', 'canonical');
          link.setAttribute('href', canonicalUrl);
          document.head.appendChild(link);
        }
      }
    });
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
