import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

export class Buy{
  name: string;
  post_id: string;             
  post_city: string;           
  post_street: string;         
  post_houseNumber: string;    
  bill_id: string;             
  bill_city: string;           
  bill_street: string;         
  bill_houseNumber: string;    
  bill_number: string;         
  purchase_number: string;     
  purchase_expire: Date;       
  purchase_pin: string; 
  blahaj: string;       

  constructor() {
    this.name = '';
    this.post_id = '';
    this.post_city = '';
    this.post_street = '';
    this.post_houseNumber = '';
    this.bill_id = '';
    this.bill_city = '';
    this.bill_street = '';
    this.bill_houseNumber = '';
    this.bill_number = '';
    this.purchase_number = '';
    this.purchase_expire = new Date();
    this.purchase_pin = '';
    this.blahaj = '';
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  items = [
    {
      id: "big",
      img: "/big.png"
    },
    {
      id: "smol",
      img: "/smol.png"
    },
    {
      id: "pink",
      img: '/pink.png'
    }
  ]

  @Get()
  @Render('shop')
  getHello() {
    return {
      products: this.items,
      data: new Buy(),
      errors: []
    };
  }
  @Post()
  postAcc(
    @Body() buy: Buy, 
    @Res() response: Response)
    {
      let error = [];
      if(buy.blahaj == null){
        error.push("Nem választottál cukiságot");
      }
      if(buy.purchase_number.length != 16) {
        error.push("A bankártyaszám nem értelmezhető");
      }
      if(buy.purchase_pin.length != 4) {
        error.push("A kártya pinje érnóvénytelen");
      }
      if(new Date(buy.purchase_expire) < new Date()) {
        error.push("A kártya már lejárt");
      }
      if(!buy.name){
        error.push("Minden mezőt meg kell adni");
      }
      if (error.length > 0){
        let newBuy = new Buy();
        newBuy.name = buy.name;
        newBuy.post_id = buy.post_id; 
        newBuy.post_city = buy.post_city;
        newBuy.post_street = buy.post_street;
        newBuy.post_houseNumber = buy.post_houseNumber;

        newBuy.bill_id = buy.bill_id; 
        newBuy.bill_city = buy.bill_city;
        newBuy.bill_street = buy.bill_street;
        newBuy.bill_houseNumber = buy.bill_houseNumber;
        newBuy.bill_number = buy.bill_number;
        response.render('shop', {
          products: this.items,
          data: newBuy,
          errors : error
        });
        return;
      }
    
    response.redirect('/success');
  }
  @Get('success')
  @Render('success')
  loadSuccess(){

  }
}
