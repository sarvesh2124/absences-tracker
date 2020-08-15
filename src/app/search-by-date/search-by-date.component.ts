import { Component, OnInit, Input } from '@angular/core';
import { MemberAbsenceDetails } from '../models/MemberAbsenceDetails';
import * as _ from 'lodash';
import { ApiService } from 'src/api.service';

@Component({
  selector: 'app-search-by-date',
  templateUrl: './search-by-date.component.html',
  styleUrls: ['./search-by-date.component.css']
})
export class SearchByDateComponent implements OnInit {
  @Input()
  memberAbsenceDetailsList: MemberAbsenceDetails[];
  @Input() startDate: any;
  @Input() endDate: any;
  memberAbsenceFilteredList: MemberAbsenceDetails[];
  MemberAbsence: MemberAbsenceDetails;
  searchByParams: boolean;
  showResults: boolean;
  showError: boolean;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.showResults = false;
    if (this.startDate != null && this.endDate != null) {
      this.searchByParams = true;
      this.filterByStartEndDates(new Date(this.startDate), new Date(this.endDate));
    }
    else {
      this.searchByParams = false;
    }
  }

  filterByStartEndDates(start: Date, end: Date) {
    this.memberAbsenceFilteredList = [];
    _.each(this.memberAbsenceDetailsList, (member, index) => {
      this.MemberAbsence = new MemberAbsenceDetails();
      this.MemberAbsence.absenceDetails = [];
      _.each(member.absenceDetails, (absence) => {
        if (new Date(absence.startDate) >= start && new Date(absence.startDate) <= end) {
          this.MemberAbsence.absenceDetails.push(absence);
          this.MemberAbsence.memberDetails = member.memberDetails;
          this.memberAbsenceFilteredList.push(this.MemberAbsence);
          return;
        }
        else if (new Date(absence.endDate) >= start && new Date(absence.endDate) <= end) {
          this.MemberAbsence.absenceDetails.push(absence);
          this.MemberAbsence.memberDetails = member.memberDetails;
          this.memberAbsenceFilteredList.push(this.MemberAbsence);
        }
      })
    })
    console.log(this.memberAbsenceFilteredList);
    this.showResults = true;
  }

  search() {
    this.showError = false;
    this.showResults = false;
    if (this.startDate != null && this.endDate) {
      this.showError = false;
      this.filterByStartEndDates(this.startDate, this.endDate);
    }
    else {
      this.showError = true;
    }

  }

  exportAll() {
    this.apiService.generateICal(this.memberAbsenceFilteredList);
  }
}
