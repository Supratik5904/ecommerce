import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showSideBar: boolean = false;
  selectedComponent?:string;


  toggleSideBar(){
    this.showSideBar = !this.showSideBar
  }

  selectItem(selected: string){
    this.selectedComponent = selected;
  }
}
