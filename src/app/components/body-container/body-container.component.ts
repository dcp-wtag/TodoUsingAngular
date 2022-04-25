import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddTaskUiService } from '../../services/add-task-ui.service';

@Component({
  selector: 'app-body-container',
  templateUrl: './body-container.component.html',
  styleUrls: ['./body-container.component.css'],
})
export class BodyContainerComponent implements OnInit {
  isShownAddCart: boolean = false;

  constructor(
    private router: Router,
    private addTaskUiService: AddTaskUiService
  ) {}

  ngOnInit(): void {}

  onAddButtonPressed() {
    this.addTaskUiService.toggleAddTask();
  }
}
