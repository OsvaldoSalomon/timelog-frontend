import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  public List = ['abc', 'def', 'ghi', 'jkl'];
  totalElements: number = 0;
  currentCard = null;
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];


  constructor() { }

  ngOnInit() {
  }

  setActive(card, index) {
    this.currentCard = card;
    this.currentIndex = index;
  }

  handlePageChange(event) {
    this.page = event;
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
  }


}
