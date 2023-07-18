import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-upload-download',
  templateUrl: './image-upload-download.component.html',
  styleUrls: ['./image-upload-download.component.css']
})
export class ImageUploadDownloadComponent {

  url = "http://localhost:8089/";

  selectedFile: File | null = null;
  fileName: string | null = "";
    // dummy url
    url2: string = "";

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    // event's file at 0th place to selectedFile
    this.selectedFile = event.target.files[0];
    // assigning selected file's name
    this.fileName = this.selectedFile?.name!;
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      // appending the selected file to formData
      formData.append('file', this.selectedFile);

      // calling post api method to upload this file to db 
      this.http.post(this.url + "uploadimage", formData, { observe: 'response', responseType: 'text' })
        .subscribe((response: any) => {
          if (response.status == 200) {
            console.log('Image uploaded successfully.');
          }  // Handle success
        }, (error) => {
          console.error('Failed to upload the image.');
          // Handle error
        });
    }
  }

  // method to download the image
  onDownload() {
    const downloadUrl = this.url + "getImage/1";
    // accessing the blob type of data from the url
    this.http.get(downloadUrl, { responseType: 'blob' }).subscribe(resp => {
      // passing blob type of data to handleFile()
      this.handleFile(resp);
      console.log("****", resp);
    }, error => {
      console.log('Error downloading file:', error);
    });
  }


  // method to create download url
  private handleFile(file: Blob) {
    const blob = new Blob([file], { type: file.type });

    //generating a link of the file to be downloaded
    this.url2 = window.URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.click();
  }
}


