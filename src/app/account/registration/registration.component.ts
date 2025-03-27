import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, this.emailValidator]],  // Egyéni email validátor
      password: ['', [Validators.required, Validators.minLength(5)]],  // Jelszó minimum hossz validálása
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  // Jelszó és jelszó megerősítése validálása
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Egyéni email validátor, hogy tartalmazza az '@' és '.' karaktereket
  emailValidator(control: any): { [key: string]: boolean } | null {
    const email = control.value;
    if (email && email.includes('@') && email.includes('.')) {
      return null;
    }
    return { 'invalidEmail': true };  // Hibát jelez, ha nincs '@' vagy '.'
  }

  // Űrlap beküldése
  onSubmit() {
    if (this.registrationForm.valid) {
      const formValue = this.registrationForm.value;
      localStorage.setItem('userEmail', formValue.email);
      localStorage.setItem('userPassword', formValue.password); 
      alert('Regisztráció sikeres!');
      this.router.navigate(['/login']);
    }
  }
}





// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.css']
// })
// export class RegistrationComponent {
//   registrationForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.registrationForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(5)]],
//       confirmPassword: ['', [Validators.required]]
//     }, {
//       validators: this.passwordsMatchValidator
//     });
//   }

//   passwordsMatchValidator(group: FormGroup) {
//     const password = group.get('password')?.value;
//     const confirmPassword = group.get('confirmPassword')?.value;
//     return password === confirmPassword ? null : { mismatch: true };
//   }

//   onSubmit() {
//     if (this.registrationForm.valid) {
//       const formValue = this.registrationForm.value;
//       localStorage.setItem('userEmail', formValue.email);
//       localStorage.setItem('userPassword', formValue.password); 
//       alert('Regisztráció sikeres!');
//       this.router.navigate(['/login']);
//     }
//   }
// }




