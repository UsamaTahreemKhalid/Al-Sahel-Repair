import { Component, signal, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { filter } from 'rxjs';
import { SeoService } from './services/seo.service';

declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  protected readonly title = signal('al-sahel-repair');
  public readonly isChatOpen = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService
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

    // Dynamic SEO Meta Tag & Schema Update on routing
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      
      const title = route.snapshot.title || 'AC Repair Dubai, Sharjah & Ajman | AL SAHEL Repair';
      const description = route.snapshot.data['description'] || 'Expert AC repair in Sharjah, Ajman, and Dubai. AL SAHEL Repair provides professional AC maintenance, washing machine repair, and refrigerator repair services.';
      const currentRoute = this.router.url;
      let canonicalUrl = 'https://al-sahel-repair.ae' + currentRoute;
      if (canonicalUrl.endsWith('/') && canonicalUrl.length > 27) {
        canonicalUrl = canonicalUrl.slice(0, -1);
      }

      this.seoService.updatePageMetadata({
        title,
        description,
        canonicalUrl,
        currentRoute
      });

      this.injectSchema();
    });
  }

  private injectSchema() {
    const schemaGraph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": "https://al-sahel-repair.ae/#organization",
          "name": "AL SAHEL Repair",
          "url": "https://al-sahel-repair.ae/",
          "telephone": "+971562475707",
          "priceRange": "AED",
          "image": "https://al-sahel-repair.ae/img/icon/logo.webp",
          "description": "Expert home appliance repair and maintenance services in Dubai, Sharjah, and Ajman. Certified technicians for AC, washing machines, refrigerators, and more.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "76 Thabit Bin Qais Street, 2 Al Nuaimia",
            "addressLocality": "Ajman",
            "addressRegion": "Ajman",
            "postalCode": "00000",
            "addressCountry": "AE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "25.3843",
            "longitude": "55.4478"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Dubai" },
            { "@type": "AdministrativeArea", "name": "Sharjah" },
            { "@type": "AdministrativeArea", "name": "Ajman" }
          ],
          "sameAs": [
            "https://www.facebook.com/alsahelrepair",
            "https://www.instagram.com/alsahelrepair"
          ]
        },
        {
          "@type": "Service",
          "name": "AC Repair & Maintenance",
          "serviceType": "Air Conditioning Repair",
          "provider": { "@id": "https://al-sahel-repair.ae/#organization" },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Dubai" },
            { "@type": "AdministrativeArea", "name": "Sharjah" },
            { "@type": "AdministrativeArea", "name": "Ajman" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "AC Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AC Installation" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AC Duct Cleaning" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gas Refilling" } }
            ]
          }
        },
        {
          "@type": "Service",
          "name": "Washing Machine Repair",
          "serviceType": "Appliance Repair",
          "provider": { "@id": "https://al-sahel-repair.ae/#organization" },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Dubai" },
            { "@type": "AdministrativeArea", "name": "Sharjah" }
          ]
        },
        {
          "@type": "Service",
          "name": "Refrigerator & Fridge Repair",
          "serviceType": "Appliance Repair",
          "provider": { "@id": "https://al-sahel-repair.ae/#organization" },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Dubai" },
            { "@type": "AdministrativeArea", "name": "Sharjah" }
          ]
        }
      ]
    };
    this.seoService.injectJsonLdSchema(schemaGraph);
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
