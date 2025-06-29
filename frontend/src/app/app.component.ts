import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StarsService } from './services/stars-service/stars.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading = true;
  
  constructor() {}
  
  ngOnInit(): void {
    // Simulate app initialization
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
