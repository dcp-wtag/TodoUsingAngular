import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ErrorSuccessSpinnerService } from 'src/app/services/error-success-spinner.service';
import { KeywordService } from '../../services/keyword.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  keyword: string = '';
  isPressed: boolean = false;

  @ViewChild('searchInput') set searchInput(ref: ElementRef) {
    if (!!ref) {
      ref.nativeElement.focus();
    }
  }

  constructor(
    private keywordService: KeywordService,
    private errorSuccessSpin: ErrorSuccessSpinnerService
  ) {}

  ngOnInit(): void {}

  keywordPressed() {
    this.errorSuccessSpin.isLoadingSubject.next(true);
    setTimeout(() => {
      this.keywordService.subject.next(this.keyword);
      this.errorSuccessSpin.isLoadingSubject.next(false);
    }, 1000);
  }

  onPress(): void {
    this.isPressed = !this.isPressed;
    if (!this.isPressed && this.keyword.length > 0) {
      this.keyword = '';
      this.keywordPressed();
    }
  }
}
