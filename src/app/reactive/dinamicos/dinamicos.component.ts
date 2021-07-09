import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.minLength(3) ] ],
    favoritos: this.fb.array([
      [ 'Metal Gear', Validators.required ],
      [ 'Death Stranding', Validators.required ]
    ], Validators.required )
  });

  nuevoFavorito: FormControl = this.fb.control( '', Validators.required );

  get favoritosArray() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private fb: FormBuilder ) { }

  guardar() {
    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
  }

  agregarFavorito() {
    if ( this.nuevoFavorito.invalid ) { return; }
    //this.favoritosArray.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    this.favoritosArray.push( this.fb.control( this.nuevoFavorito.value, Validators.required ) );
    this.nuevoFavorito.reset();
  }

  borrarFavorito( index: number ) {
    this.favoritosArray.removeAt( index );
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.controls[campo].invalid
           && this.miFormulario.controls[campo].touched;
  }

}
