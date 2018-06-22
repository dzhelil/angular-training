import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  time: Observable<any>;

  ngOnInit(): void {
    this.time = Observable.create((observer) => {
      observer.next(new Date());
      setInterval(() => {
        observer.next(new Date());
      }, 1000);
    })
  }
}
