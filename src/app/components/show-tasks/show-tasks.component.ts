import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css'],
})
export class ShowTasksComponent implements OnInit {
  state: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.state = this.router.url;
    this.state = this.state.slice(1);
    console.log(this.state);
  }
}
