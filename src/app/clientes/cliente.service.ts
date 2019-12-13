import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2'

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-type' : 'application/json'});

  constructor(private http: HttpClient,
    private router: Router) { }

  getClientes(): Observable<Cliente[]>{
  	//return of(CLIENTES);
  	//return this.http.get<Cliente[]>(this.urlEndPoint);
  	return this.http.get(this.urlEndPoint).pipe(
  		map( response => response as Cliente[])
  		);
  }

  create(cliente: Cliente): Observable<any>{
  	return this.http.post<any>(this.urlEndPoint, cliente,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        //this.router.navigate[''];
        swal("Error al crear", e.error.mensaje, 'error')
        return throwError(e);
      })
      );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(      
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensage);
        swal('Error al actualizar', e.error.mensage, 'error');
        return throwError(e);
      })
      );
  }

  deleteCliente(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {        
        this.router.navigate(['/clientes']);
        swal('Error al eliminar',e.error.mensaje,'error');
        return throwError(e);
      })
      );
  }
}
