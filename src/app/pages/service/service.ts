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
      description: 'Keep your home cool and your energy bills low with our comprehensive AC tune-up. We perform deep coil cleaning, check electrical connections, and fine-tune pressure levels to ensure your unit runs at peak performance all summer long.',
      category: 'ac',
      icon: 'fas fa-snowflake',
      image: 'img/services/ac-maintenance.jpg',
      featured: true
    },
    {
      id: 'ac-repair',
      title: 'A/C System Repair',
      description: 'Is your AC blowing warm air or making strange noises? Our expert technicians provide fast, reliable repairs for compressors, fan motors, and gas leaks. We diagnose the root cause quickly to restore your comfort without delay.',
      category: 'ac',
      icon: 'fas fa-wrench',
      image: 'img/services/ac-repair.jpg',
      featured: true
    },
    {
      id: 'ac-install',
      title: 'Install AC',
      description: 'Upgrading to a new cooling system? We specialize in the precision installation of high-efficiency split, window, and central AC units. Our team ensures perfect calibration and placement for maximum cooling and longevity.',
      category: 'ac',
      icon: 'fas fa-plus-circle',
      image: 'img/services/ac-install.jpg',
      featured: true
    },
    {
      id: 'ac-preventive',
      title: 'A/C Preventive Maintenance',
      description: 'Avoid unexpected breakdowns during the hottest months with our proactive maintenance plans. We provide scheduled filter cleanings and system health checks to identify potential issues before they become costly repairs.',
      category: 'ac',
      icon: 'fas fa-shield-alt',
      image: 'img/services/ac-preventive.jpg',
      featured: true
    },
    {
      id: 'ac-dismantlement',
      title: 'A/C System Dismantlement',
      description: 'Moving or replacing an old unit? Our professional team provides safe and clean decommissioning of old AC systems. We handle refrigerant recovery and removal with care to ensure no damage to your property or the environment.',
      category: 'ac',
      icon: 'fas fa-trash-alt',
      image: 'img/services/ac-dismantlement.jpg',
      featured: false
    },
    {
      id: 'ac-vent-cleaning',
      title: 'A/C System Vent Cleaning',
      description: 'Breathe cleaner air with our professional vent and grill disinfection service. We remove accumulated dust, allergens, and mold from your AC vents to improve indoor air quality and keep your family healthy.',
      category: 'ac',
      icon: 'fas fa-broom',
      image: 'img/services/ac-vent-cleaning.jpg',
      featured: false
    },
    {
      id: 'portable-ac',
      title: 'Portable A/C Services',
      description: 'Need cooling in a specific spot? We offer specialized maintenance and repair for portable air conditioners. From exhaust setup to internal cleaning, we make sure your portable unit provides maximum relief where you need it most.',
      category: 'ac',
      icon: 'fas fa-mobile-alt',
      image: 'img/services/portable-ac.jpg',
      featured: false
    },
    {
      id: 'ductless-ac',
      title: 'Ductless Heating & A/C Services',
      description: 'Enjoy personalized comfort with modern mini-split and ductless systems. We provide expert installation and service for these energy-efficient units, allowing you to control the temperature in each room independently.',
      category: 'ac',
      icon: 'fas fa-wind',
      image: 'img/services/ductless-ac.jpg',
      featured: false
    },
    {
      id: 'heating-install',
      title: 'Heating System Installation',
      description: 'When the temperature drops, stay warm with a professionally installed heating system. We install high-performance furnaces and energy-efficient heat pumps designed to provide reliable warmth for years to come.',
      category: 'heating',
      icon: 'fas fa-fire-alt',
      image: 'img/services/heating-install.jpg',
      featured: false
    },
    {
      id: 'heating-maintenance',
      title: 'Heating System Maintenance',
      description: 'Prepare your home for winter with our detailed annual heating tune-up. We inspect heat exchangers, test safety controls, and clean vital components to ensure your system is safe and ready when you need it.',
      category: 'heating',
      icon: 'fas fa-tools',
      image: 'img/services/heating-maintenance.jpg',
      featured: false
    },
    {
      id: 'heating-repair',
      title: 'Heating System Repair',
      description: 'Don\'t let a broken heater leave you in the cold. Our technicians quickly fix thermostat issues, igniters, and burners to restore warm airflow to your home or office, ensuring your comfort is never compromised.',
      category: 'heating',
      icon: 'fas fa-couch',
      image: 'img/services/heating-repair.jpg',
      featured: false
    },
    {
      id: 'duct-cleaning',
      title: 'HVAC Duct & Vent Cleaning',
      description: 'Clean ducts mean a more efficient HVAC system and a healthier home. We use specialized vacuums and sanitizing agents to clear away dust, debris, and odor-causing bacteria from deep within your ductwork.',
      category: 'duct',
      icon: 'fas fa-broom',
      image: 'img/services/duct-cleaning.jpg',
      featured: true
    },
    {
      id: 'duct-repair',
      title: 'HVAC Duct & Vent Installation / Repair',
      description: 'Poorly sealed ducts can waste a significant amount of energy. We identify air leaks, repair collapsed ducts, and optimize your system\'s airflow to ensure every room stays comfortable while lowering your utility costs.',
      category: 'duct',
      icon: 'fas fa-toolbox',
      image: 'img/services/duct-repair.jpg',
      featured: false
    },
    {
      id: 'ceiling-install',
      title: 'Ventilated Ceiling Installation / Repair',
      description: 'Enhance your space with professionally installed acoustic and ventilated ceiling panels. Our solutions improve air distribution and sound quality while giving your interior a modern and polished look.',
      category: 'duct',
      icon: 'fas fa-cube',
      image: 'img/services/ceiling-install.jpg',
      featured: true
    },
    {
      id: 'hvac-maintenance',
      title: 'HVAC System Maintenance',
      description: 'Our premium seasonal maintenance programs are designed for complete peace of mind. We cover everything from central cooling and heating to ventilation and mechanical controls, ensuring your entire system stays in top shape.',
      category: 'hvac',
      icon: 'fas fa-sync',
      image: 'img/services/hvac-maintenance.jpg',
      featured: false
    },
    {
      id: 'hvac-repair',
      title: 'HVAC System Repair',
      description: 'Facing a major HVAC failure? We provide quick-response troubleshooting and expert repairs for central air units, chillers, and air-handling systems. We get your complex mechanical systems back online fast.',
      category: 'hvac',
      icon: 'fas fa-cogs',
      image: 'img/services/hvac-repair.jpg',
      featured: false
    },
    {
      id: 'hvac-repair-general',
      title: 'Repair HVAC',
      description: 'We handle mechanical HVAC restoration for all makes and models. Whether it\'s a residential unit or a large commercial setup, our technicians have the experience to solve the most difficult system problems.',
      category: 'hvac',
      icon: 'fas fa-cog',
      image: 'img/services/hvac-repair-general.jpg',
      featured: false
    },
    {
      id: 'thermostat-repair',
      title: 'Thermostat Installation / Repair',
      description: 'Take control of your indoor climate with our thermostat services. We calibrate sensors, fix wiring issues, and install modern programmable thermostats that help you save energy and stay comfortable automatically.',
      category: 'hvac',
      icon: 'fas fa-temperature-high',
      image: 'img/services/thermostat-repair.jpg',
      featured: false
    },
    {
      id: 'refrigerator-repair',
      title: 'Refrigerator Repair Service',
      description: 'A broken fridge is a major inconvenience. Our team provides fast, reliable repairs for cooling issues, compressor failures, and seal leaks. We work on all major brands to keep your food fresh and your kitchen running.',
      category: 'general',
      icon: 'fas fa-box',
      image: 'img/services/general-install.jpg',
      featured: true
    },
    {
      id: 'washing-machine-repair',
      title: 'Washing Machine Repair Service',
      description: 'Dealing with drainage problems or a machine that won\'t spin? Our experts fix all types of washing machines and dryers quickly. We use quality parts to ensure your laundry routine gets back to normal as soon as possible.',
      category: 'general',
      icon: 'fas fa-tint',
      image: 'img/services/general-cleaning.jpg',
      featured: true
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
