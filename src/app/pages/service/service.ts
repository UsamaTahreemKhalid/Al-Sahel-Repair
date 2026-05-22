import { Component, AfterViewInit, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var WOW: any;

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: 'ac' | 'heating' | 'duct' | 'hvac' | 'general';
  icon: string;
  image: string;
  featured: boolean;
}

@Component({
  selector: 'app-service',
  imports: [RouterLink],
  templateUrl: './service.html',
  styles: ``,
})
export class Service implements AfterViewInit {
  public readonly activeCategory = signal<string>('all');
  public readonly searchTerm = signal<string>('');

  public readonly services: ServiceItem[] = [
    {
      id: 'ac-maintenance',
      title: 'A/C System Maintenance',
      description: 'Comprehensive inspection, deep coil cleaning, electrical checks, and pressure tuning to ensure optimal cooling performance and efficiency.',
      category: 'ac',
      icon: 'fas fa-snowflake',
      image: 'img/services/ac-maintenance.jpg',
      featured: true
    },
    {
      id: 'ac-repair',
      title: 'A/C System Repair',
      description: 'Fast diagnosis and expert repair of compressor failures, fan issues, cooling cycles, and gas leaks to restore cold air immediately.',
      category: 'ac',
      icon: 'fas fa-wrench',
      image: 'img/services/ac-repair.jpg',
      featured: true
    },
    {
      id: 'ac-install',
      title: 'Install AC',
      description: 'Precision installation of high-efficiency split, window, and central A/C units with perfect electrical calibration and placement.',
      category: 'ac',
      icon: 'fas fa-plus-circle',
      image: 'img/services/ac-install.jpg',
      featured: true
    },
    {
      id: 'ac-preventive',
      title: 'A/C Preventive Maintenance',
      description: 'Proactive scheduled tune-ups, filter cleaning, and system checks designed to eliminate unexpected breakdowns and extend unit lifespans.',
      category: 'ac',
      icon: 'fas fa-shield-alt',
      image: 'img/services/ac-preventive.jpg',
      featured: true
    },
    {
      id: 'ac-dismantlement',
      title: 'A/C System Dismantlement',
      description: 'Safe, professional decommissioning and removal of old air conditioning units, ensuring zero refrigerant leakage or environmental impact.',
      category: 'ac',
      icon: 'fas fa-trash-alt',
      image: 'img/services/ac-dismantlement.jpg',
      featured: false
    },
    {
      id: 'ac-vent-cleaning',
      title: 'A/C System Vent Cleaning',
      description: 'Deep cleaning and disinfection of air conditioning vents and grills to eliminate dust and allergens, improving indoor air quality.',
      category: 'ac',
      icon: 'fas fa-broom',
      image: 'img/services/ac-vent-cleaning.jpg',
      featured: false
    },
    {
      id: 'portable-ac',
      title: 'Portable A/C Services',
      description: 'Specialized installation, repair, and maintenance for portable and spot-cooling A/C units, providing cold air wherever you need it.',
      category: 'ac',
      icon: 'fas fa-mobile-alt',
      image: 'img/services/portable-ac.jpg',
      featured: false
    },
    {
      id: 'ductless-ac',
      title: 'Ductless Heating & A/C Services',
      description: 'Complete sales, installation, and service for modern mini-split and ductless systems, perfect for energy-saving multi-zone climate control.',
      category: 'ac',
      icon: 'fas fa-wind',
      image: 'img/services/ductless-ac.jpg',
      featured: false
    },
    {
      id: 'heating-install',
      title: 'Heating System Installation',
      description: 'Professional installation of high-performance heating units, furnaces, and energy-efficient heat pumps built to last.',
      category: 'heating',
      icon: 'fas fa-fire-alt',
      image: 'img/services/heating-install.jpg',
      featured: false
    },
    {
      id: 'heating-maintenance',
      title: 'Heating System Maintenance',
      description: 'Detailed annual tune-ups, heat exchanger inspections, and safety checks to guarantee reliable heating when winter arrives.',
      category: 'heating',
      icon: 'fas fa-tools',
      image: 'img/services/heating-maintenance.jpg',
      featured: false
    },
    {
      id: 'heating-repair',
      title: 'Heating System Repair',
      description: 'Expert repairs for heating coils, thermostats, igniters, and burners to quickly restore warm, comforting airflow to your home or office.',
      category: 'heating',
      icon: 'fas fa-couch',
      image: 'img/services/heating-repair.jpg',
      featured: false
    },
    {
      id: 'duct-cleaning',
      title: 'HVAC Duct & Vent Cleaning',
      description: 'Comprehensive duct cleaning using specialized vacuum and sanitizing systems to remove mold, dirt, and odor-causing bacteria.',
      category: 'duct',
      icon: 'fas fa-broom',
      image: 'img/services/duct-cleaning.jpg',
      featured: true
    },
    {
      id: 'duct-install',
      title: 'HVAC Duct & Vent Installation',
      description: 'Expert layout design, fabrication, and installation of durable duct networks for balanced airflow and optimal indoor ventilation.',
      category: 'duct',
      image: 'img/services/duct-install.jpg',
      icon: 'fas fa-th-large',
      featured: false
    },
    {
      id: 'duct-repair',
      title: 'HVAC Duct & Vent Repair',
      description: 'Sealing air leaks, correcting air distribution problems, and repairing collapsed or damaged ducts to dramatically boost HVAC efficiency.',
      category: 'duct',
      icon: 'fas fa-toolbox',
      image: 'img/services/duct-repair.jpg',
      featured: false
    },
    {
      id: 'ceiling-install',
      title: 'Ventilated Ceiling Installation',
      description: 'Seamless custom installation of acoustic and ventilated ceiling panels, ensuring excellent indoor air diffusion and sleek, modern aesthetics.',
      category: 'duct',
      icon: 'fas fa-cube',
      image: 'img/services/ceiling-install.jpg',
      featured: true
    },
    {
      id: 'ceiling-repair',
      title: 'Ventilated Ceiling Repairs',
      description: 'Comprehensive repair services for ventilated ceilings, resolving airflow blockages, panel sagging, structural issues, or system vibrations.',
      category: 'duct',
      icon: 'fas fa-tools',
      image: 'img/services/ceiling-repair.jpg',
      featured: false
    },
    {
      id: 'hvac-maintenance',
      title: 'HVAC System Maintenance',
      description: 'Premium seasonal maintenance programs cover full-package central cooling, heating, ventilation, and mechanical control checks.',
      category: 'hvac',
      icon: 'fas fa-sync',
      image: 'img/services/hvac-maintenance.jpg',
      featured: false
    },
    {
      id: 'hvac-repair',
      title: 'HVAC System Repair',
      description: 'Quick-response troubleshooting and repairs for complete central air units, chillers, and integrated air-handling units.',
      category: 'hvac',
      icon: 'fas fa-cogs',
      image: 'img/services/hvac-repair.jpg',
      featured: false
    },
    {
      id: 'hvac-repair-general',
      title: 'Repair HVAC',
      description: 'Comprehensive residential and commercial mechanical HVAC restoration services for all system makes, models, and setups.',
      category: 'hvac',
      icon: 'fas fa-cog',
      image: 'img/services/hvac-repair-general.jpg',
      featured: false
    },
    {
      id: 'thermostat-install-simple',
      title: 'Install Thermostat',
      description: 'Professional setup and wiring of standard, digital, or smart Wi-Fi thermostats to achieve precise room climate control.',
      category: 'hvac',
      icon: 'fas fa-temperature-high',
      image: 'img/services/thermostat-install-simple.jpg',
      featured: false
    },
    {
      id: 'thermostat-install',
      title: 'Thermostat Installation',
      description: 'Upgrade your building with advanced programmable thermostats, allowing energy-saving scheduling and remote control options.',
      category: 'hvac',
      icon: 'fas fa-sliders-h',
      image: 'img/services/thermostat-install.jpg',
      featured: false
    },
    {
      id: 'thermostat-repair',
      title: 'Thermostat Repair',
      description: 'Accurate diagnostics and repair of thermostat calibrations, sensor failures, and communication line wiring issues.',
      category: 'hvac',
      icon: 'fas fa-wrench',
      image: 'img/services/thermostat-repair.jpg',
      featured: false
    },
    {
      id: 'general-install',
      title: 'Installation',
      description: 'Professional general installation of climate ventilation grates, register covers, dampers, and general cooling accessories.',
      category: 'general',
      icon: 'fas fa-hammer',
      image: 'img/services/general-install.jpg',
      featured: false
    },
    {
      id: 'general-cleaning',
      title: 'Cleaning',
      description: 'Thorough sanitization and superficial cleaning of A/C outer shells, grills, filter baskets, and structural mounting brackets.',
      category: 'general',
      icon: 'fas fa-soap',
      image: 'img/services/general-cleaning.jpg',
      featured: false
    }
  ];

  public readonly filteredServices = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const cat = this.activeCategory();

    return this.services.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(term) ||
                            s.description.toLowerCase().includes(term);
      const matchesCategory = cat === 'all' || s.category === cat;
      return matchesSearch && matchesCategory;
    });
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof WOW !== 'undefined') {
        new WOW().init();
      }
    }
  }

  setCategory(category: string) {
    this.activeCategory.set(category);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.searchTerm.set(input.value);
    }
  }

  resetFilters() {
    this.searchTerm.set('');
    this.activeCategory.set('all');
  }

  bookOnWhatsApp(serviceTitle: string) {
    if (isPlatformBrowser(this.platformId)) {
      const message = `Hi Al Sahel Repair! I would like to book the service: *${serviceTitle}*. Please let me know your availability and rates.`;
      const whatsappUrl = `https://wa.me/971562475707?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  }
}
