import { Injectable } from '@angular/core';
import { FileHandle } from '../model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private santizer: DomSanitizer) { }

  public createImage(productImages:any){
    const productImagesFileHandle : FileHandle[] = [];
    for(let i=0;i<productImages.length;i++){
      const imageFileData = productImages[i];
      const imageBlob = this.dataUrltoBlob(imageFileData['picture'],imageFileData['type'])
      const imageFile = new File([imageBlob],imageFileData['name'],{type: imageFileData['type']});
      const fileHandle: FileHandle = {
        file: imageFile,
        url: this.santizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      }
      productImagesFileHandle.push(fileHandle);
    }
    return productImagesFileHandle;
  }

  public dataUrltoBlob(picBytes : string,imageType: string){
    const bytesString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(bytesString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i=0;i<bytesString.length;i++){
      int8Array[i] = bytesString.charCodeAt(i);
    }

    const blob = new Blob([int8Array],{type: imageType});
    return blob;
  }
}
