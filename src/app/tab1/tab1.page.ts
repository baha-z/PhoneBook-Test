import { Component, OnInit  } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {

  public personList = [];
  public filteredArray = [];
  public name: string;
  public lastname: string;
  public selectedRegion: string;
  public selectedComuna: string;
  public regiones = [];
  public comunas = [];

  constructor(
    private apiService: ApiServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPersona();
    this.getRegion();
   }

  getRegion(){
    this.apiService.getRegion().subscribe(
      (data: any) => {
        data.map((region: any) => {
          this.regiones.push(region);
        });
      }
    )
    console.log(this.regiones);
  }

  getComuna(region:any){
    let SRegion = [];
    this.selectedRegion = region;
    SRegion = this.regiones.filter(regionA => 
      regionA.nombre.toLowerCase().indexOf(region.toLowerCase()) > -1
    );
    this.comunas = SRegion[0].comunas
  }

  getSelectedComuna(comuna:any){
    this.selectedComuna = comuna;
  }

  getPersona() {
   this.apiService.getPersona().subscribe(
    (data: any) => {
      data.map((person: any) => {
        if (person.activo){
          this.personList.push(person);
        }
      });       
    },
    (error) =>{
      console.error(error);
    }
  )
  }

  filterItems() {
    this.filteredArray = this.personList;
    if (this.name !== "" && this.name !== undefined){
      this.filteredArray = this.filteredArray.filter(item => 
        item.nombre.toLowerCase().indexOf(this.name.toLowerCase()) > -1
      );
    }
    if (this.lastname !== "" && this.lastname !== undefined){
      this.filteredArray = this.filteredArray.filter(item => 
        item.apellido.toLowerCase().indexOf(this.lastname.toLowerCase()) > -1
      );
    }
    if (this.selectedComuna !== "" && this.selectedComuna !== undefined){
      this.filteredArray = this.filteredArray.filter(item => 
          item.direccion.comuna.nombre.toLowerCase().indexOf(this.selectedComuna.toLowerCase()) > -1
        );
    }
  }

  openDetailsPerson(person:any){
    let navigationExtras: NavigationExtras = {
      state: {
        user: person
      }
    };
    this.router.navigate(['profile'], navigationExtras);
  }
}
