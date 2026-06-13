import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public updatePageMetadata(config: {
    title: string;
    description: string;
    canonicalUrl: string;
    currentRoute: string;
  }) {
    // 1. Set Title and Meta Description
    this.titleService.setTitle(config.title);
    this.metaService.updateTag({ name: 'description', content: config.description });
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: config.canonicalUrl });

    // 2. Manage Canonical and Hreflang Link Tags dynamically
    this.clearExistingLinkTags();
    this.createLinkTag('canonical', config.canonicalUrl);
    this.createLinkTag('alternate', config.canonicalUrl, 'en-ae');
    this.createLinkTag('alternate', `https://al-sahel-repair.ae/ar${config.currentRoute}`, 'ar-ae');
    this.createLinkTag('alternate', config.canonicalUrl, 'x-default');
  }

  public injectJsonLdSchema(schemaGraph: any): void {
    const existingSchema = this.document.getElementById('al-sahel-jsonld');
    if (existingSchema) {
      existingSchema.remove();
    }
    const script = this.document.createElement('script');
    script.setAttribute('id', 'al-sahel-jsonld');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(schemaGraph);
    this.document.head.appendChild(script);
  }

  private createLinkTag(rel: string, href: string, hreflang?: string) {
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('href', href);
    if (hreflang) {
      link.setAttribute('hreflang', hreflang);
    }
    this.document.head.appendChild(link);
  }

  private clearExistingLinkTags() {
    const links = this.document.querySelectorAll("link[rel='canonical'], link[rel='alternate']");
    links.forEach(tag => tag.remove());
  }
}
