import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   producto   : new FormControl('RTX 3090'),
  //   precio     : new FormControl(1500),
  //   existencias: new FormControl(5)
  // });

  miFormulario: FormGroup = this.fb.group({
    producto: [ null, [ Validators.required, Validators.minLength(3) ] ],
    precio: [ null, [ Validators.required, Validators.min(0) ] ],
    existencias: [ null, [ Validators.required, Validators.min(0) ] ]
  });

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      producto: 'RTX 3070',
      precio: 500
    });
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.controls[campo].errors
           && this.miFormulario.controls[campo].touched;
  }

  guardar() {
    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
