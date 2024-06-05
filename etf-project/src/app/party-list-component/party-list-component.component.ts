import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-party-list-component',
  templateUrl: './party-list-component.component.html',
  styleUrls: ['./party-list-component.component.scss'],
})
export class PartyListComponentComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'company_name',
    'image',
    'email',
    'mobile_no',
    'telephone_no',
    'pan_no',
    'gstin',
    'anniversary_date',
    'credit_limit',
    'bank_detail',
    'address',
    'date_of_birth',
    'actions',
  ];
  parties = new MatTableDataSource<any>([]);
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getParties();
  }
  getParties() {
    const token = localStorage.getItem('authToken');
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });

    this.http.get<any[]>('https://ap.greatfuturetechno.com/party/').subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.parties.data = data;
          console.log('Parties data:', data);
        } else {
          console.error('Data format error: Expected an array.');
        }
      },
      (error) => {
        console.error('API error:', error);
        if (error.status === 401) {
          console.error(
            'Authorization error. Check token or server configuration.'
          );
        }
      }
    );
  }
  addParty() {
    this.router.navigate(['/party-form']);
  }

  editParty(party: any) {
    this.router.navigate(['/party-form'], { queryParams: { id: party.id } });
  }

  deleteParty(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const params = new HttpParams().set('id', id.toString());
        this.http
          .delete('https://ap.greatfuturetechno.com/party/', { params })
          .subscribe(
            () => {
              Swal.fire('Deleted!', 'Party has been deleted.', 'success');
              this.getParties();
            },
            (error) => {
              Swal.fire(
                'Error!',
                'There was an issue deleting the party.',
                'error'
              );
              console.error('Delete API error:', error);
            }
          );
      }
    });
  }
  convertDataToTable(data: any): string {
    let table =
      '<table class="swal2-table" style="width:100%; border-collapse: collapse;">';
    table += '<tr><th>Field</th><th>Value</th></tr>';
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        table += `<tr><td style="border: 1px solid #ddd; padding: 8px;">${key}</td><td style="border: 1px solid #ddd; padding: 8px;">${data[key]}</td></tr>`;
      }
    }
    table += '</table>';
    return table;
  }

  showDataInPopup(data: any): void {
    const tableHtml = this.convertDataToTable(data);

    Swal.fire({
      title: 'Bank Details',
      html: tableHtml,
      width: '600px',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'OK',
    });
  }
}
