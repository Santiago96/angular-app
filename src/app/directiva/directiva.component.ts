import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent{

  listaCurso: string[] = ['TypeScript','.Net','Java','PHP','C++','Python','C#','Javascript'];
  habilitar: boolean = true;
  constructor() { }  


  setHabilitar(){
  	this.habilitar = !this.habilitar;
  }

}
