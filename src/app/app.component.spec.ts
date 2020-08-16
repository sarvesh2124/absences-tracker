import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/api.service';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;
  var memberDetails = [{
    "crewId": 352,
    "id": 713,
    "image": "https://tinyurl.com/y6zatdy3",
    "name": "Ines",
    "userId": 649
  }]
  var absenceDetails = [
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ButtonModule, RadioButtonModule, TableModule,
        DialogModule, ToastModule, CalendarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [ApiService, MessageService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should combine member and absences, and generate MemberAbsenceDetails List', () => {
    component.membersDetails = memberDetails;
    component.absenceDetails = absenceDetails;
    component.generateMemberAbsence();
    expect(component.memberAbsenceDetailsList.length).toBeGreaterThan(0);
  })

  it('should generate MemberAbsenceDetails List with empty if member and absences are empty', () => {
    component.membersDetails = [];
    component.absenceDetails = [];
    component.generateMemberAbsence();
    expect(component.memberAbsenceDetailsList.length).toBe(0);
  })

  it('should display search by id section if user clicks on the radio', () => {
    component.selectedSearchValue = 'searchById';
    component.loadSearch();
    expect(component.showSearchByIdSection).toBe(true);
  })

  it('should display search by date section if user clicks on the radio'), () => {
    component.selectedSearchValue = 'searchByDate';
    expect(component.showSearchByDateSection).toBe(true);
  }

  it('onInit should load and set data', () => {
    component.memberAbsenceDetailsList = []
    component.ngOnInit();
    expect(component.memberAbsenceDetailsList.length).toBeGreaterThanOrEqual(0);
  })
});
