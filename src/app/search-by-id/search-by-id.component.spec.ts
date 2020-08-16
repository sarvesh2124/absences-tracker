import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByIdComponent } from './search-by-id.component';
import { MemberAbsenceDetails } from '../models/MemberAbsenceDetails';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/api.service';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';



describe('SearchByIdComponent', () => {
  let component: SearchByIdComponent;
  let fixture: ComponentFixture<SearchByIdComponent>;
  let apiService: ApiService;
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
        "endDate": new Date("2017-06-29"),
        "id": 6311,
        "memberNote": "",
        "rejectedAt": null,
        "startDate": new Date("2017-06-29"),
        "type": "vacation",
        "userId": 649
      }
    ]
  }
  var memberAbsenceList: MemberAbsenceDetails[];
  memberAbsenceList = [];
  memberAbsenceList.push(member);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ButtonModule, RadioButtonModule, TableModule,
        DialogModule, ToastModule, CalendarModule, FormsModule],
      declarations: [SearchByIdComponent],
      providers: [ApiService, MessageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByIdComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
    fixture.detectChanges();
  });

  it('should set member details with absence details', () => {
    component.showMemberAbsenceList(member);
    expect(component.memberAbsenceDetails).toEqual(member);
    expect(component.absenceList).toEqual(member.absenceDetails);
    expect(component.showAbsencePopup).toEqual(true);
  });

  it('should not set member details with absence details if member is null', () => {
    component.ngOnInit();
    component.showMemberAbsenceList(memberWithNull);
    expect(component.memberAbsenceDetails.memberDetails).toEqual(null);
  });

  it('should set data to be exported', () => {
    component.export(member);
    expect(component.exportDetails[0]).toEqual(member);
  });

  it('should not set data to be exported if member is null', () => {
    component.export(memberWithNull);
    expect(component.exportDetails[0].memberDetails).toBe(null)
  });

  it('should make a service call to export data', () => {
    spyOn(apiService, 'generateICal').and.callThrough();
    fixture.detectChanges();
    component.exportAll();
    expect(apiService.generateICal).toHaveBeenCalledTimes(1);
  });

  it('ngOnInit should check for memberId',() => {
    if(component.searchMemberId == null) {
      expect(component.memberAbsenceDetailsList).not.toBeNull();
    }
  });

});
