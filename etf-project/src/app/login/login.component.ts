import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('topInAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('500ms', style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  isHover: boolean = false;
  ngOnInit(): void {
    localStorage.clear();
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  @HostListener('mouseenter') mouseove(event: Event) {
    this.isHover = true;
  }
  @HostListener('mouseleave') mouseleave(event: Event) {
    this.isHover = false;
  }
  onSubmit(form: any) {
    const loginData = {
      username: form.value.username,
      password: form.value.password,
    };

    this.http
      .post('https://ap.greatfuturetechno.com/login/', loginData)
      .subscribe(
        (response: any) => {
          console.log('Login successful', response);

          localStorage.setItem('authToken', response.token);

          this.router.navigate(['/party-management']);
        },
        (error) => {
          this.snackBar.open('User Name and Password are Invalid', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['failure'],
          });
          console.error('Login failed', error);
        }
      );
  }
}
