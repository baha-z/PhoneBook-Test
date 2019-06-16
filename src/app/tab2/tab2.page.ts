import { Component,  OnInit  } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit  {
  public hasErrors: boolean = false;
  data: any;

  constructor(
    private apiService: ApiServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }

  ngOnInit() {
  }

  //metodo adaptado de https://gist.github.com/rotvulpix/69a24cc199a4253d058c
  checkRut() {
    const rawrut = this.data.rut;
    let valor = rawrut.replace('.','');
    valor = valor.replace('-','');
    const cuerpo = valor.slice(0,-1);
    let dv = valor.slice(-1).toUpperCase();
  
    if(cuerpo.length < 7) {
       return false;
    }

    let suma = 0;
    let multiplo = 2;

    for(let i=1; i <= cuerpo.length; i++) {
        const index = multiplo * valor.charAt(cuerpo.length - i);
        suma = suma + index;
        if(multiplo < 7) {
          multiplo = multiplo + 1;
        } else { 
          multiplo = 2;
        }
    }
    
    let dvEsperado = 11 - (suma % 11);
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    if(dvEsperado != dv) {
       return false; 
    }
    return true;
}
}
