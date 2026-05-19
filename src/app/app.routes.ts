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
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'service', component: Service },
  { path: 'feature', component: Feature },
  { path: 'team', component: Team },
  { path: 'testimonial', component: Testimonial },
  { path: 'contact', component: Contact },
  { path: 'quote', component: Quote },
  { path: '404', component: NotFound },
  { path: '**', redirectTo: '404' }
];
