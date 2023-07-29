import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContentComponent } from './content/content.component';
// import { MapViewComponent } from './map-view/map-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-contact', component: ContactFormComponent },
  { path: 'edit-contact/:id', component: ContactFormComponent },
  { path: 'content-list', component: ContentComponent },
  { path: 'home', component: HomeComponent },
  
  // { path: 'map-view', component: MapViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
