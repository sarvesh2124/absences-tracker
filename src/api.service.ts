import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbsenceDetails } from './app/models/AbsenceDetails';
import { MemberDetails } from './app/models/MemberDetails';
import * as _ from "lodash";
import * as ics from 'ics';
import * as FileSaver from 'file-saver';
import { MemberAbsenceDetails } from './app/models/MemberAbsenceDetails';
import {MessageService} from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  downloadFile: boolean;

  constructor(private http: HttpClient,private messageService: MessageService) { }

  getMembersDetails() {
    return this.http.get<any>("../assets/json_files/members.json");
  }
  getAbsencesDetails() {
    return this.http.get<any>("../assets/json_files/absences.json");
  }

  generateICal(exportDetails: MemberAbsenceDetails[]) {

    let events = [];
    var name;
    var leaveType;
    var startDate = new Date();
    var endDate;
    var year;
    var month;
    var date;
    _.each(exportDetails, (exportData, index) => {
      _.each(exportData.absenceDetails, (absenceData, key) => {
        var event = {
          title: "",
          start: [],
          end: []
        };
        name = exportData.memberDetails.name;
        leaveType = absenceData.type;
        startDate = new Date(absenceData.startDate);
        endDate = new Date(absenceData.endDate);

        if (leaveType == 'vacation') {
          event.title = name + " is on vacation";
        }
        if (leaveType == 'sickness') {
          event.title = name + " is sick";
        }
        year = startDate.getFullYear();
        month = startDate.getMonth() + 1;
        date = startDate.getDate();
        event.start = [year, month, date, 10, 0];
        year = endDate.getFullYear();
        month = endDate.getMonth() + 1;
        date = endDate.getDate();
        event.end = [year, month, date, 10, 0];
        events.push(event);
      })
    })
    console.log(events);
    if (events.length > 0) {
      ics.createEvents(events, (error, value) => {
        if (error) {
          console.log(error)
        }
        var blob = new Blob([value], { type: "ics" });
        FileSaver.saveAs(blob, "AbsenceTracker.ics");
        this.messageService.add({severity:'success', summary:'File Download Success!', detail:''});
      })
    }
    else {
      this.messageService.add({severity:'warn', summary:'No Records To Download', detail:''});
    }
  }
}
