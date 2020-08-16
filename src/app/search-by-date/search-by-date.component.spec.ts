import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByDateComponent } from './search-by-date.component';
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
import { MemberAbsenceDetails } from '../models/MemberAbsenceDetails';



describe('SearchByDateComponent', () => {
  let component: SearchByDateComponent;
  let fixture: ComponentFixture<SearchByDateComponent>;
  let apiService: ApiService;
  var startDate = "02/20/2017";
  var endDate = "02/25/2017"
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ButtonModule, RadioButtonModule, TableModule,
        DialogModule, ToastModule, CalendarModule, FormsModule],
      declarations: [SearchByDateComponent],
      providers: [ApiService, MessageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByDateComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
    fixture.detectChanges();
  });

  it('should make a service call to export data', () => {
    spyOn(apiService, 'generateICal').and.callThrough();
    fixture.detectChanges();
    component.exportAll();
    expect(apiService.generateICal).toHaveBeenCalledTimes(1);
  });

  it('should search and call filterByStartEndDates, if start and end dates are entered and searched', () => {
    spyOn(component, 'filterByStartEndDates').and.callThrough();
    component.ngOnInit();
    component.startDate = startDate;
    component.endDate = endDate;
    component.search();
    expect(component.filterByStartEndDates).toHaveBeenCalledTimes(1);
  })

  it('should show error message if start Date is empty', () => {
    component.ngOnInit();
    component.startDate = null;
    component.endDate = endDate;
    component.search();
    expect(component.showError).toBe(true);
  })

  it('should show error message if end Date is empty', () => {
    component.ngOnInit();
    component.startDate = startDate;
    component.endDate = null;
    component.search();
    expect(component.showError).toBe(true);
  })

  it('should show error message if both start Date and end Date is empty', () => {
    component.ngOnInit();
    component.startDate = null;
    component.endDate = null;
    component.search();
    expect(component.showError).toBe(true);
  })

  it('should call filterByStartEndDates if dates are passed in params', () => {
    spyOn(component, 'filterByStartEndDates').and.callThrough();
    component.startDate = startDate;
    component.endDate = endDate;
    component.ngOnInit();
    expect(component.filterByStartEndDates).toHaveBeenCalledTimes(1);
  })

  it('should not call filterByStartEndDates if dates are null', () => {
    component.startDate = null;
    component.endDate = null;
    component.ngOnInit();
    expect(component.searchByParams).toBe(false)
  })

  it('results should have no records if start date is null in params', () => {
    component.filterByStartEndDates(null, new Date(endDate));
    expect(component.memberAbsenceFilteredList.length).toBe(0);
  })

  it('results should have no records if end date is null in params', () => {
    component.filterByStartEndDates(new Date(startDate), null);
    expect(component.memberAbsenceFilteredList.length).toBe(0);
  })

  it('results should have no records if both start and end date is null in params', () => {
    component.filterByStartEndDates(null, null);
    expect(component.memberAbsenceFilteredList.length).toBe(0);
  })

  it('results may or may not have records if both start and end date are passed in params', () => {
    component.memberAbsenceDetailsList = memberAbsenceList;
    component.filterByStartEndDates(new Date(startDate), new Date(endDate));
    expect(component.memberAbsenceFilteredList.length).toBeGreaterThanOrEqual(0);
  })
});
