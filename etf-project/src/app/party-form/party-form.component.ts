import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-party-form',
  templateUrl: './party-form.component.html',
  styleUrls: ['./party-form.component.scss'],
})
export class PartyFormComponent implements OnInit {
  partyForm!: FormGroup;
  addressForm!: FormGroup;
  bankForm!: FormGroup;
  partyId: any;
  isEdit: boolean = false;
  parties: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.route.queryParams.subscribe((param) => {
      if (param['id']) {
        this.partyId = param['id'];
        this.isEdit = true;
        this.getPartyList();
      }
    });
  }
  initializeForm() {
    this.partyForm = this.fb.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      mobile_no: ['', Validators.required],
      telephone_no: [''],
      whatsapp_no: [''],
      image: [null],
      email: ['', Validators.email],
      remark: [''],
      login_access: [false],
      date_of_birth: [''],
      anniversary_date: [''],
      gstin: [Number],
      pan_no: [''],
      apply_tds: [false],
      credit_limit: [''],
      addresses: this.fb.array([this.createAddressGroup()]),
      banks: this.fb.array([this.createBankGroup()]),
    });
  }
  getPartyList() {
    let query = 'id=' + this.partyId;
    this.http
      .get<any[]>('https://ap.greatfuturetechno.com/party/?' + query)
      .subscribe(
        (data) => {
          this.parties = data;
          this.partyForm.patchValue(this.parties);
          this.addressForm.patchValue(this.parties.address[0]);
          this.bankForm.patchValue(this.parties.bank_id[0]);
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

  createAddressGroup() {
    return (this.addressForm = this.fb.group({
      address_line_1: ['', Validators.required],
      address_line_2: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
    }));
  }

  createBankGroup() {
    return (this.bankForm = this.fb.group({
      bank_ifsc_code: ['', Validators.required],
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_no: ['', Validators.required],
      account_holder_name: ['', Validators.required],
    }));
  }

  get addresses(): FormArray {
    return this.partyForm.get('addresses') as FormArray;
  }

  get banks(): FormArray {
    return this.partyForm.get('banks') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.createAddressGroup());
  }

  addBank() {
    this.banks.push(this.createBankGroup());
  }

  onSubmit() {
    if (this.partyForm.valid) {
      const formData: any = new FormData();
      Object.keys(this.partyForm.controls).forEach((key) => {
        if (key === 'addresses' || key === 'banks') {
          formData.append(key, JSON.stringify(this.partyForm.get(key)?.value));
        } else {
          formData.append(key, this.partyForm.get(key)?.value);
        }
      });

      this.http
        .post('https://ap.greatfuturetechno.com/party/', formData)
        .subscribe((response) => {
          this.router.navigate(['party-management']);
          console.log(response);
        });
    }
  }
  updatePartyList() {
    if (this.partyForm.valid) {
      const formData: any = new FormData();
      Object.keys(this.partyForm.controls).forEach((key) => {
        if (key === 'addresses' || key === 'banks') {
          formData.append(key, JSON.stringify(this.partyForm.get(key)?.value));
        } else {
          formData.append(key, this.partyForm.get(key)?.value);
        }
      });

      this.http
        .put('https://ap.greatfuturetechno.com/party/', formData)
        .subscribe((response) => {
          Swal.fire({
            title: 'Success',
            text: 'Party updated successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['party-management']);
            }
          });
          console.log(response);
        });
    }
  }
}
