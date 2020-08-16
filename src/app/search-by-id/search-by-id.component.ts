import { Component, OnInit, Input } from '@angular/core';
import { MemberAbsenceDetails } from '../models/MemberAbsenceDetails';
import { AbsenceDetails } from '../models/AbsenceDetails';
import { ApiService } from 'src/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-search-by-id',
  templateUrl: './search-by-id.component.html',
  styleUrls: ['./search-by-id.component.css']
})
export class SearchByIdComponent implements OnInit {

  @Input()
  memberAbsenceDetailsList: MemberAbsenceDetails[];
  @Input()
  searchMemberId;
  showAbsencePopup: boolean;
  memberAbsenceDetails: MemberAbsenceDetails;
  absenceList: AbsenceDetails[];
  memberImage: any;
  exportDetails: MemberAbsenceDetails[];
  specificMemberSearch: boolean;
  searchMemberById: MemberAbsenceDetails;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    if (this.searchMemberId != null) {
      this.specificMemberSearch = true;
      this.searchMemberById = _.find(this.memberAbsenceDetailsList, (member) => {
        return member.memberDetails.userId == this.searchMemberId;
      })
      this.memberAbsenceDetailsList = [];
      if (this.searchMemberById != null) {
        this.memberAbsenceDetailsList.push(this.searchMemberById);
      }
    }
  }

  showMemberAbsenceList(member: MemberAbsenceDetails) {
    this.memberAbsenceDetails = member != null ? member : null;
    this.absenceList = member.absenceDetails != null ? member.absenceDetails : null;
    this.showAbsencePopup = member != null ? true : false;
  }

  export(exportData: MemberAbsenceDetails) {
    this.exportDetails = [];
    this.exportDetails.push(exportData != null ? exportData : null);
    this.apiService.generateICal(this.exportDetails);
  }

  exportAll() {
    this.apiService.generateICal(this.memberAbsenceDetailsList);
  }

}
