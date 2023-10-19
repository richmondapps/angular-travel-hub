import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  deleteObject,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  percentage,
  getDownloadURL
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  uploadProgress$: number;
  progress: number;
  downloadUrl$?: string;

  constructor(private storage: Storage) { }

   uploadFileAndGetMetadata(
    fileObj: File | null,
    mediaFolderPath: string,
    metadata: any
  ) {
  //  console.log('fileObj', fileObj);
  //  console.log('Media Folder Path', mediaFolderPath);
  //  console.log('metadata', metadata);
    //  const { name } = fileToUpload;
    // const file = fileObj.target.files[0];
    // const file = fileObj.base64;
    // const fileName = file.name;
    const filePath = `${mediaFolderPath}`;
    if(fileObj){

        const storageRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, fileObj);

        uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + this.progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }


        },
        (error) => {
          // Handle unsuccessful uploads
          console.log('File error', error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.downloadUrl$ = downloadURL
            console.log('File available at', downloadURL);
            this.uploadProgress$ = this.progress;
            // this.downloadUrl$ = this.downloadUrl$

          });
        }
     );
    }
      return {

        uploadProgress$:  this.progress,
        downloadUrl$: this.downloadUrl$
      };


  }

  // private getDownloadUrl$(
  //   uploadTask,
  //   path: string,
  // ): Observable < string > {
  //   return from(uploadTask).pipe(
  //     switchMap((_) => this.storage.ref(path).getDownloadURL()),
  //   );
  // }

  bytesToSize(bytes: number): string {
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return 'n/a';
  }
    const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
    if (i === 0) {
      return `${bytes} ${sizes[i]}`;
  }
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  }

  async getPublicUrl(path: string) {
  //  console.log('PATH', path );
  //  return  this.storage.ref(path).getDownloadURL();

   const url = await getDownloadURL(ref(this.storage, path));
  //  console.log('URL', url);
    return url;
  }
  async getGSUrl(path: string) {
  //  console.log('PATH', path );
  //  return  this.storage.ref(path).getDownloadURL();

   const url = (ref(this.storage, path));
    console.log('URL', url);
    return url;
  }
}
