import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { OrderDetail } from 'src/app/model/product.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  @ViewChild('pdfTable') pdfTable!: ElementRef ;

  orderDetail : OrderDetail = {
    orderId: 0,
    orderFullName: '',
    orderFullOrder: '',
    orderContactNumber: '',
    orderAlternateContactNumber: '',
    orderStatus: '',
    orderAmount: 0,
    product: []
  }

  constructor(private route:ActivatedRoute){};

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.data.subscribe(
      (response)=>{
        console.log(response['orderDetail']);

        this.orderDetail=response['orderDetail'];
      }
    )

  }

  public convetToPDF(){
    var data = document.getElementById('pdfTable');
    if(data!=null){
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('new-file.pdf'); // Generated PDF
    });
  }
}

}


