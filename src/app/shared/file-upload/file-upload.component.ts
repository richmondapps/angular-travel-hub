import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  Firestore, addDoc, orderBy, collection, collectionData,
  doc, docData, deleteDoc, query, updateDoc, DocumentReference, setDoc, getDocs, where, serverTimestamp
} from '@angular/fire/firestore';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { CreateService } from 'src/app/services/create.service';
// import { CreateService } from 'src/app/services/create.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
// import firebase from 'firebase/app';
// import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('collectionPath') collectionPath: any;
  @Input('publicOrPrivate') publicOrPrivate: any;
  @Input('documentId') documentId: any;
  @Input('firestoreRecordPath') firestoreRecordPath: any;
  @Input('firebaseStoragePath') firebaseStoragePath: any;
form: FormGroup;
  selectedFile: any;
  isFileSize: string;
  fileToLarge: boolean;
  showFileMeta: boolean;
  showProgressBar: boolean;
  showUploadButton = false;
  selectedFileName: any;
  fileToUpload: any;
  selectedFileSize: any;
  siteService: any;
  collectionName: string;
  uploadProgress$: any ;
  permittedAccess: any;
  getDownloadUrl$: any;
  progress$: any;
  uploadDocId: string;
  showSubmitBtn = true;
  showUploadMsg = false;
  uploadMsg: string;
  downLoadUrlComplete: any;
  downloadUrl$: string;
  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private fileService: FileUploadService,
    private storage: Storage,
    private snackbarService: SnackbarService,
    private createService: CreateService
  ) { }

  ngOnInit(): void {

  //  console.log('COL DATA',  this.collectionPath);

    this.collectionName = 'corpBranchTest';
    this.permittedAccess = 'public';
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      itemName: [''],
      itemUploadedDate: [''],
      itemDescription: [''],
      imgUrl: ['', [Validators.required]]
    });
  }

  selectedFileFn(event: any) {
    this.selectedFile = event.target.files[0];
    this.isFileSize = (this.selectedFile.size / 1048576).toFixed(1) + 'MB';
    if (this.selectedFile.size > 10485760) {
      this.fileToLarge = true;
      this.showFileMeta = false;
      this.showProgressBar = false;

      this.showUploadButton = false;
    } else {
      this.fileToLarge = false;
      this.showFileMeta = true;
      this.showProgressBar = true;
      this.selectedFileName = this.selectedFile.name;
      this.fileToUpload = this.selectedFile;
      this.selectedFileSize = this.fileService.bytesToSize(this.selectedFile.size);
      this.showUploadButton = true;
    //  console.log('RA File To Upload ', this.fileToUpload);
    }
  }
  async submitFormData() {
    const d = this.form.value;
    const firestoreRecordPath = this.firestoreRecordPath;
    //  d.itemName = str.toLowerCase();
    this.uploadDocId = UidGeneratorService.newId();
    const origFileName = this.fileToUpload.name;
    const publicOrPrivate = this.publicOrPrivate;
    const metadata = {
      customMetadata: {
        fileStatus: publicOrPrivate,
        firestoreRecordPath: `${firestoreRecordPath}/${this.uploadDocId}`,
        originalFileName: origFileName
      }
    };
    const storagePath = `${this.firebaseStoragePath}/${this.uploadDocId
}`;
console.log('RA storagePath', storagePath);
    d.itemId = this.uploadDocId;
    // d.documentUrl = this.contractDocumentUrl;
   

 
    try {

          const storageRef = ref(this.storage, storagePath);
          const uploadTask = uploadBytesResumable(storageRef, this.fileToUpload);
          uploadTask.on('state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            this.progress$ = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + this.progress$ + '% done');
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
            console.log('File error', error.message);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              this.downloadUrl$ = downloadURL
              console.log('File available at', downloadURL);
              if(this.downloadUrl$){
                console.log('PROG IS 100')
                this.showFileMeta = false;
                this.showProgressBar = false;
                this.showUploadButton = false;
               }
              //  setTimeout(() => {
              //   this.snackbarService.success('Your file has been uploaded.');
              // }, 1500);

              this.snackbarService.success('Your file has been uploaded.');

                const formData = {
        ...d,
        fileId: this.uploadDocId,
        storagePath,
        fileUrl:  this.downloadUrl$,
        fileName: origFileName
      };

       this.createService.createRecordFn(
        `${firestoreRecordPath}`,
         this.uploadDocId, 
         formData)
            });
          }
       );

     

            console.log('RA Upload Progress', this.uploadProgress$);

            // console.log('RA Upload Progress', this.uploadProgress$);
            // console.log('getDownloadUrl Progress', downloadUrl$);
            // downloadUrl$.subscribe((d: string) => {
            //   this.downLoadUrlComplete = d;
            //   const updatedData = {
            //     ...formData,
            //     itemUploadedDate: serverTimestamp(),
            //     documentUrl: d
            //   }

//               try {
//                 this.createService.createRecordFn(
//                 collectionPath, this.documentId, updatedData)

//               console.log('DOWN URL', d);
//               console.log('Updated Data', updatedData);

//               if(this.downLoadUrlComplete){
//                 console.log('PROG IS 100')
//                this.showFileMeta = false;
//              this.showProgressBar = false;
//              this.showUploadButton = false;
//               }
//                      setTimeout(() => {
//                        const snackClass = ['snackSuccess'];
//                        const message = 'Your file has been uploaded.';
//                        this.snackbarService.openSnackBar(message, snackClass);
//                      }, 1500);
//               } catch (error) {
//                 console.log('NO URL', error);
//                 this.uploadMsg = 'Your file has NOT been uploaded, please try again.'
//  const snackClass = ['snackError'];
//             const message = '!Your file has NOT been uploaded, please try again.';
//             this.snackbarService.openSnackBar(message, snackClass);
//               }
//             });
          } catch (error) {
            console.log('Outer try catch NO URL', error);
            // const snackClass = ['snackError'];
            // const message = '! Record NOT Added';
            // this.snackbarService.openSnackBar(message, snackClass);
          }
        }
}
