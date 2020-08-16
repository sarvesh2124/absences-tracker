import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { MemberAbsenceDetails } from './app/models/MemberAbsenceDetails';

describe('ApiService', () => {
  let service: ApiService;
  var memberWithNull: MemberAbsenceDetails = {
    memberDetails: null,
    absenceDetails: []
  }
  var member: MemberAbsenceDetails = {
    memberDetails: {
      "crewId": 352,
      "id": 713,
      "image": "https://tinyurl.com/y6zatdy3",
      "name": "Ines",
      "userId": 649
    },
    absenceDetails: [
      {
        "admitterId": null,
        "admitterNote": "",
        "confirmedAt": new Date("2017-06-13T07:51:39.000+02:00"),
        "createdAt": new Date("2017-06-12T15:21:16.000+02:00"),
        "crewId": "352",
        "endDate": new Date("2017-02-25"),
        "id": 6311,
        "memberNote": "",
        "rejectedAt": null,
        "startDate": new Date("2017-02-25"),
        "type": "vacation",
        "userId": 649
      }
    ]
  }
  var memberAbsenceList: MemberAbsenceDetails[];
  memberAbsenceList = [];
  memberAbsenceList.push(member);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MessageService],
    });
    service = TestBed.inject(ApiService);
  });

  it('api service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get JSON from members.json file', () => {
    expect(service.getMembersDetails).toBeTruthy();
  });

  it('should get JSON from absences.json file', () => {
    expect(service.getAbsencesDetails).toBeTruthy();
  });

  it('should generate ics file and show success message, if memberAbsenceDetails are passed as list', () => {
    memberAbsenceList = []
    memberAbsenceList.push(member)
    service.generateICal(memberAbsenceList);
    expect(service.generateICalMessage).toBe('File Download Success!')
  })

  it('should not generate ics file and show warning message, if memberAbsenceDetails is passed as empty list', () => {
    memberAbsenceList = []
    memberAbsenceList.push(memberWithNull)
    service.generateICal(memberAbsenceList);
    expect(service.generateICalMessage).toBe('No Records To Download')
  })
});
