import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Service } from './pages/service/service';
import { Feature } from './pages/feature/feature';
import { Team } from './pages/team/team';
import { Testimonial } from './pages/testimonial/testimonial';
import { Contact } from './pages/contact/contact';
import { Quote } from './pages/quote/quote';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'AC Repair Sharjah, Ajman & Dubai | Best AC Maintenance & Service - AL SAHEL Repair',
    data: {
      description: 'Looking for reliable AC repair in Sharjah, Ajman, or Dubai? AL SAHEL Repair offers fast, 24/7 emergency AC repair, split/central AC maintenance, washing machine repair, and refrigerator repair at affordable rates. Get your free quote today!',
      keywords: 'AC Repair Sharjah, AC repair Ajman, AC repair Dubai, AC maintenance Sharjah, washing machine repair Dubai, refrigerator repair Ajman'
    }
  },
  {
    path: 'about',
    component: About,
    title: 'About Us | Certified AC Repair & Maintenance Experts - AL SAHEL Repair',
    data: {
      description: 'Learn about AL SAHEL Repair & Maintenance, your certified local experts for professional AC repair, installation, and appliance servicing across Sharjah, Ajman, and Dubai.',
      keywords: 'About AL SAHEL Repair, certified AC technicians, AC service company Ajman, appliance repair experts Dubai'
    }
  },
  {
    path: 'service',
    component: Service,
    title: 'Our Services | Complete AC Repair, Duct Cleaning & Appliance Services',
    data: {
      description: 'Explore our range of cooling and home appliance services including air conditioner repair, preventive AC maintenance, HVAC duct cleaning, thermostat repair, washing machine servicing, and refrigerator repair.',
      keywords: 'AC services Dubai, AC maintenance, HVAC duct cleaning Sharjah, washing machine repair, refrigerator service'
    }
  },
  {
    path: 'feature',
    component: Feature,
    title: 'Why Choose Us | Trusted AC & Appliance Repair Services',
    data: {
      description: 'Find out why AL SAHEL Repair is the preferred choice for AC maintenance and repairs. We offer certified technicians, transparent pricing, and 24/7 emergency support.',
      keywords: 'best AC repair company, trusted technicians, 24/7 emergency AC repair, affordable cooling repair'
    }
  },
  {
    path: 'team',
    component: Team,
    title: 'Meet Our Team | Experienced AC Technicians & Repair Specialists',
    data: {
      description: 'Get to know the professional team of certified technicians at AL SAHEL Repair, dedicated to keeping your home comfortable with reliable AC and appliance service.',
      keywords: 'AC repair team, professional technicians, cooling system specialists, AL SAHEL team'
    }
  },
  {
    path: 'testimonial',
    component: Testimonial,
    title: 'Customer Reviews & Testimonials | AL SAHEL Repair Reviews',
    data: {
      description: 'Read what our satisfied customers say about our fast, professional, and affordable AC repair and maintenance services in Sharjah, Ajman, and Dubai.',
      keywords: 'AC repair reviews, customer testimonials, AL SAHEL Repair feedback, reliable appliance repair reviews'
    }
  },
  {
    path: 'contact',
    component: Contact,
    title: 'Contact Us | 24/7 AC Repair & Service Hotline - AL SAHEL Repair',
    data: {
      description: 'Need urgent AC repair or appliance servicing? Contact AL SAHEL Repair. We offer 24/7 support across Sharjah, Ajman, and Dubai. Call or book on WhatsApp now!',
      keywords: 'contact AC repair, emergency AC service Ajman, WhatsApp AC repair Dubai, AL SAHEL phone number'
    }
  },
  {
    path: 'quote',
    component: Quote,
    title: 'Get a Free Quote | Affordable AC & Appliance Repairs',
    data: {
      description: 'Request a free, no-obligation quote for your AC repair, maintenance, installation, or appliance servicing. Fill out our form to book your service today!',
      keywords: 'free AC quote, AC repair cost estimate, budget appliance service, book AC repair'
    }
  },
  {
    path: '404',
    component: NotFound,
    title: 'Page Not Found | 404 Error - AL SAHEL Repair',
    data: {
      description: 'We are sorry, the page you are looking for does not exist on our website.',
      keywords: 'page not found, 404, AL SAHEL Repair'
    }
  },
  { path: '**', redirectTo: '404' }
];
