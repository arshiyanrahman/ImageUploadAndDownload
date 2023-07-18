import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-upload-download',
  templateUrl: './image-upload-download.component.html',
  styleUrls: ['./image-upload-download.component.css']
})
export class ImageUploadDownloadComponent {

  url= "http://localhost:8089/";

  selectedFile: File | null = null;
  fileName: string | null ="";
  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName=this.selectedFile?.name!;
    console.log("in onFileSelected()");
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      console.log("in onUpload()");
      formData.append('file', this.selectedFile);

      this.http.post(this.url + "uploadimage", formData,{observe:'response',responseType:'text'})
        .subscribe((response : any )=> {
          if(response.status==200){
          console.log('Image uploaded successfully.');
            }  // Handle success
        }, (error) => {
          console.error('Failed to upload the image.');
          // Handle error
        });
    }
  }

  onDownload() {
    const downloadUrl =this.url + "getImage/1";
    this.http.get(downloadUrl,{responseType : 'blob'}).subscribe(resp =>{
      this.handleFile(resp);
      console.log("****", resp);
      }, error =>{
        console.log('Error downloading file:', error);
      });
}

url2 : string = "";
private handleFile(file : Blob){
  const blob = new Blob([file],{type :file.type});
  this.url2 = window.URL.createObjectURL(blob);

  const a =document.createElement('a');

  a.click();
}
}


