import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/api.service';
import { AbsenceDetails } from './models/AbsenceDetails';
import { MemberDetails } from './models/MemberDetails';
import { MemberAbsenceDetails } from './models/MemberAbsenceDetails';
import * as _ from "lodash";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  absenceDetails: AbsenceDetails[];
  membersDetails: MemberDetails[];
  selectedSearchValue: String;
  showSearchByIdSection: boolean;
  showSearchByDateSection: boolean;
  memberAbsenceDetailsList: MemberAbsenceDetails[];
  memberAbsenceDetail: MemberAbsenceDetails;
  searchMemberId: any;
  startDate: any;
  endDate: any;
  searchByParams: boolean;

  constructor(private apiService: ApiService,private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.getPageDetails();
    this.searchByParams = false;
    this.activatedRoute.queryParams.subscribe(params=>{
      let userId = params['userId'];
      let startDate = params['startDate'];
      let endDate = params['endDate'];
      if(userId != null) {
        this.searchMemberId = userId;
        this.selectedSearchValue = 'searchById';
        this.searchByParams = true;
      }
      else if(startDate != null || endDate != null){
        this.startDate = startDate;
        this.endDate = endDate;
        this.selectedSearchValue = 'searchByDate';
        this.searchByParams = true;
      }
      this.loadSearch(); 
    })
    
       
  }

  getPageDetails() {
    this.apiService.getMembersDetails().subscribe((response) => {
      this.membersDetails = response.payload;
      this.apiService.getAbsencesDetails().subscribe((response) => {
        this.absenceDetails = response.payload;
        this.generateMemberAbsence();
      })
    })
    
  }

  generateMemberAbsence() {
   this.memberAbsenceDetailsList = [];
    _.each (this.membersDetails, (member,index)=>{
      this.memberAbsenceDetail = new MemberAbsenceDetails();
      this.memberAbsenceDetail.absenceDetails = []
      this.memberAbsenceDetail.memberDetails = member;
      _.each(this.absenceDetails,(absence)=>{
        if(absence.userId == member.userId){
          this.memberAbsenceDetail.absenceDetails.push(absence)
        }
      })
      this.memberAbsenceDetailsList.push(this.memberAbsenceDetail);
    });    
  }
  loadSearch() {
    if (this.selectedSearchValue == 'searchById' || this.selectedSearchValue != 'searchByDate') {
      this.showSearchByIdSection = true;
      this.showSearchByDateSection = false;
      this.selectedSearchValue = 'searchById'
    }
    else if (this.selectedSearchValue == 'searchByDate') {
      this.showSearchByDateSection = true;
      this.showSearchByIdSection = false;
    }
  }

}
