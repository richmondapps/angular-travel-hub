import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Firestore, serverTimestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { CreateService } from 'src/app/services/create.service';
import { DynamicFormConfigService } from 'src/app/services/dynamic-form-config.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ReadService } from 'src/app/services/read.service';
import { UpdateService } from 'src/app/services/update.service';
import { EditDocumentDialogComponent } from 'src/app/shared/edit-document-dialog/edit-document-dialog.component';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from '../../shared/image-cropper/interfaces/index';
import { base64ToFile } from '../../shared/image-cropper/utils/blob.utils';

import { SnackbarService } from 'src/app/services/snackbar.service';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('imageW') imageW: any;
  // tslint:disable-next-line:no-input-rename
  @Input('imageH') imageH: any;
  // tslint:disable-next-line:no-input-rename
  @Input('aspectRatio') aspectR: any;
  // tslint:disable-next-line:no-input-rename
  @Input('storagePath') storagePath: any;
  // tslint:disable-next-line:no-input-rename
  @Input('firestoreRecordPath') firestoreRecordPath: any;
  @Input('updateRecordPath') updateRecordPath: any;
  // tslint:disable-next-line:no-input-rename
  @Input('imageViewType') imgViewType: any;
  // tslint:disable-next-line:no-input-rename
  @Input('imgChangedEvent') imgChangedEvent: any;
  // tslint:disable-next-line:no-input-rename
  @Input('fileName') fileName: any;
  @Input('updateDoc') updateDoc: any;
  @Output() cancelImgSelection = new EventEmitter();
  @Output() selectedImgUploaded = new EventEmitter();

  venueThumb;
  venueName;
  formConfig;
  aspectRatio;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  multiImage = false;
  venueNameSlug: any;
  showAddVenueNameInput = false;
  showEditVenueNameInput = false;
  isVenueData: boolean;
  showPage: boolean;
  venueData: any;
  patchValues: any;
  branchName = 'houston';
  venueDocId: any;
  venueDetail: any;
  imageWidth: any;
  imageHeight: any;
  uploadProgress$: any;
  aspectRatio1: number;
  aspectRatio2: number;
  docId: string;
  loggedInUserEmail: any;
  showProgressBar: boolean;
  progress$: any;
  uploadMsg: string;
  lorem1: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam saepe sapiente vitae. Sequi ad dolores quis neque vel illum. Quos assumenda nesciunt explicabo? Obcaecati, vero repellat eos illo sunt fugiat.
  `;
  lorem2: `    Fugiat perspiciatis expedita itaque, voluptates aliquid maiores impedit voluptatum pariatur repudiandae animi? Eum iusto earum, eius accusamus nihil veritatis repellat obcaecati nesciunt atque perspiciatis tempore esse autem quae quibusdam dignissimos?
  `;
  lorem3: ` Cupiditate velit recusandae soluta ut impedit reiciendis eum totam ab! At modi quisquam eum, sequi nostrum atque alias dolorem. Maxime est delectus alias doloremque tempore. Nulla facere illo voluptatum rem.
  Quisquam voluptatibus saepe eos quidem placeat vel iusto qui, dolore tempora nisi delectus totam explicabo exercitationem atque quod unde libero dolor consectetur dolorem rem aspernatur fugit voluptas necessitatibus accusantium? Sit!`;
  downloadUrl$: any;
  showFileMeta: boolean;
  showUploadButton: boolean;
  constructor(
    private dynamicFormConfigService: DynamicFormConfigService,
    private readService: ReadService,
    private updateService: UpdateService,
    private createService: CreateService,
    private fileUploadService: FileUploadService,
    private afs: Firestore,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    private storage: Storage
  ) {}
  ngOnInit() {
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
    // console.log('imageW', this.imageW );
    // console.log('imageH',  this.imageH );
    // console.log('aspectRatio',  this.aspectR);
    // console.log('imgViewType',  this.imgViewType);
    // console.log('imageChangedEvent',  this.imgChangedEvent);
    // this.formConfig = this.dynamicFormConfigService.venueNameFn();
    // this.venueThumb = this.dynamicFormConfigService.venueThumbNameFn();
    // console.log('Venue Name', this.venueName);
    this.showProgressBar = true;
    this.fileChangeEvent();

    if (history.state.docId) {
      this.venueDocId = history.state.docId;
      //  console.log('State Obj', this.venueDocId);
      sessionStorage.setItem('docId', JSON.stringify(this.venueDocId));
    } else {
      this.venueDocId = JSON.parse(sessionStorage.getItem('docId'));
      this.loggedInUserEmail = JSON.parse(
        sessionStorage.getItem('LoggedInUserEmail')
      );
    }

    // this.readService.returnObservableWhereFn('corpBranchTest', 'docId', this.venueDocId).subscribe(d => {
    //   console.log('READ', d);
    //   this.venueData = d;
    //   this.patchValues = d;
    //   const filePath = d.map(x => x.fileId);
    //   this.fetchThumbFn(`corpBranchTest/${this.venueDocId}/files/${filePath}`);

    // });
    // console.log('Venue Thumb', this.venueThumb);
  }
  onCancelFn() {
    // console.log('EMITTED DATA', this.venueDocId);
    this.cancelImgSelection.emit(this.docId);
  }
  fetchThumbFn(path) {
    // this.fileUploadService.getPublicUrl(path).subscribe((d) => {
    //   this.venueThumb = d;
    // });
  }
  showAddVenueNameFn() {
    this.showAddVenueNameInput = !this.showAddVenueNameInput;
    this.formConfig = this.dynamicFormConfigService.venueNameFn();
  }

  fetchVenueDataFn() {
    this.showEditVenueNameInput = true;
    // console.log('VENUE DATA', this.venueDocId);
    this.readService
      .returnObservableWhereFn('corpBranchTest', 'docId', this.venueDocId)
      .subscribe((d) => {
        //  console.log('READ', d);
        if (!d?.length) {
          // console.log('NO ARRAY', d);
          this.isVenueData = false;
          this.showPage = true;
        } else {
          //  console.log('IS ARRAY', d);
          this.isVenueData = true;
          this.showPage = true;
          this.venueData = d;
          this.patchValues = this.venueData;
        }
      });
  }

  trimLowerCaseReplaceSpacesWithHyphenFn(d) {
    //  console.log('vName D', d);
    const val = d
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .split(' ')
      .join('-');

    // console.log(val);
    return val;
  }
  submittedFormData(d: any) {
    //  console.log('Emitted Data', d);

    if (d.venueName) {
      this.venueName = d.venueName;
      // console.log('vName', this.venueName);
      this.venueNameSlug = this.trimLowerCaseReplaceSpacesWithHyphenFn(
        this.venueName
      );
    }
    const formData = {
      ...d,
    };
    //  console.log('Venue Data', formData);
    // this.message = d;
    if (d.docId) {
      //  console.log('Branch ID', d.docId);
      const data = {
        ...d,
      };
      // this.updateService.updateRecordFn('corpBranchTest', d.docId, data);
    } else {
      // console.log('NEW ENTRY');
      // d.docId = 'corp';
      const data = {
        docId: this.venueDocId,
        ...d,
      };
      // this.createService.createRecordFn('corpBranchTest', this.venueDocId, data);
      this.isVenueData = true;
    }
  }

  fileChangeEvent(): void {
    //  console.log('event',  event);
    this.imageChangedEvent = this.imgChangedEvent;
    // this.multiImage = true;
    // this.imageWidth =  300;
    // this.imageHeight = 400;
    //  console.log('aspectRatio',  this.aspectR);
    this.aspectRatio = this.aspectR;
    this.imageWidth = this.imageW;
    this.imageHeight = this.imageH;
    // if (this.aspectR === 'threeFour'){
    //   this.aspectRatio = .75;
    // }
    // this.aspectRatio = `${this.aspectRatio1} / ${this.aspectRatio2}`;

  }

  async uploadFile() {
    // this.submitted = true;
    // const file = event.target.files[0];
    // const fileSize = file.size;
    // this.fileName = file.name;

    const storagePath = this.storagePath;
    // this.isFileSize = (file.size / 1048576).toFixed(1) + 'MB';
    const publicOrPrivate = 'public';

    const newImg = base64ToFile(this.croppedImage);
    const fileBeforeCropped = this.imageChangedEvent.target.files[0];
    const metadata = {
      customMetadata: {
        uploadedBy: this.loggedInUserEmail,
        fileStatus: publicOrPrivate,
        firestoreRecordPath: this.firestoreRecordPath,
        originalFileName: fileBeforeCropped.name,
      },
    };
    const fileObj = new File([newImg], fileBeforeCropped.name, {
      type: newImg.type,
    });

    try {

      const storageRef = ref(this.storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, fileObj);
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
        console.log('File error', error);
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

           const fStoreData = {
            uploadedBy: this.loggedInUserEmail,
            fileId: this.fileName,
            docId: this.updateDoc,
            readId: this.updateDoc,
            updateId: this.updateDoc,
            deleteId: this.updateDoc,
            createdAt: serverTimestamp(),
            storagePath,
            imageUrl: this.downloadUrl$ 
          };
          this.updateService.updateRecordFn(
            this.updateRecordPath,
            this.updateDoc,
            fStoreData
          );

           setTimeout(() => {
            this.snackbarService.success('Your file has been uploaded.');
          }, 1500);

        });
      }
   );



        console.log('CSC Upload Progress', this.uploadProgress$);

       
      } catch (error) {
        console.log('Outer try catch NO URL', error);
        // const snackClass = ['snackError'];
        // const message = '! Record NOT Added';
        // this.snackbarService.openSnackBar(message, snackClass);
      }


  
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    //  console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
    this.showCropper = true;
    // console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    //  console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    //  console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }
}
