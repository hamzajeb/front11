
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import{Service1Service}from './../../service1.service'

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  p=0
  constructor(private httpClient:HttpClient,private service1Service:Service1Service) {
   }
  ajouterProduit(produit:any){
    const headres=new HttpHeaders();
    return this.httpClient.post('http://127.0.0.1:8000/api/produits',produit,{
      headers:headres
    });
  }

  updateProduit(id:any,data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/modifierProduit/'+id,data)
  }

  listeProduit(){
    return this.httpClient.get('http://127.0.0.1:8000/api/produits');
  }

  deleteProduit(id:any){
    return this.httpClient.delete('http://127.0.0.1:8000/api/produits/'+id);

  }

  ajouterFavoris(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/ajouterFavoris',data);

  }
  supprimerFavoris(idProduit:any,idUser:any){
    return this.httpClient.delete('http://127.0.0.1:8000/api/supprimerFavoris/'+idProduit+"/"+idUser);

  }

  getFavorites(idProduit:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/favProduits/'+idProduit);    
  }

  getFavoritesUser(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/favUsers/'+id);   
  }
  listeFavUser : any[] = []
  nbrFavorite:any
  getFavUser1(){

    this.getFavoritesUser(this.service1Service.getId()).subscribe((user: any) => {
      this.listeFavUser= user.fav;
      this.nbrFavorite=this.listeFavUser.length;
      console.log("LL"+this.nbrFavorite);
   });
   return this.nbrFavorite
  }
  x(i:any){
    if(i==1){
    this.p=this.p+1
    }else{
      this.p=this.p-1
    }
  }
  q=0

  y(){
    this.q=this.q-1
  }

  ajouterPromo(id:any,data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/ajouterPromo/'+id,data)
  }
}
