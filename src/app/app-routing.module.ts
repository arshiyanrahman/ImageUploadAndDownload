import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageUploadDownloadComponent } from './image-upload-download/image-upload-download.component';

const routes: Routes = [
  {path:'', component:ImageUploadDownloadComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
