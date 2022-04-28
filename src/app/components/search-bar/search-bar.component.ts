import { Component, OnInit } from '@angular/core';
import { KeywordService } from '../../services/keyword.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  keyword: string = '';
  isPressed: boolean = false;

  constructor(private keywordService: KeywordService) {}

  ngOnInit(): void {}

  keywordPressed() {
    this.keywordService.subject.next(this.keyword);
  }

  onPress(): void {
    this.isPressed = !this.isPressed;
    if (!this.isPressed) {
      this.keyword = '';
      this.keywordPressed();
    }
  }
}
