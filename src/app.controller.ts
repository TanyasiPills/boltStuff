import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { appendFileSync, statSync, writeFileSync } from 'node:fs';


export class Buy{
  name: string;
  bankCard: string;
  enable: boolean;       

  constructor() {
    this.name = '';
    this.bankCard = '';
    this.enable = false;
  }
}

  var buyC : Buy = new Buy();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('shop')
  getHello() {
    return {    
      data: buyC,
      errors: []
    };
  }
  @Post()
  postAcc(
    @Body() buy: Buy, 
    @Res() response: Response)
    {
      const regex = new RegExp("/^\d{0,8}(-\d{0,8})?(-\d{0,8})?$/");
      let error = [];
      if(!buy.name){
        error.push("Minden mezőt meg kell adni");
      }
      if(regex.test(buy.bankCard)){
        error.push("Nem megfelelő a megadott bankszámlaszám");
      }
      if(!buy.enable){
        error.push("El kell fogadni a felhasználói feltételeket");
      }
      if (error.length > 0){
        let newBuy = new Buy();
        newBuy.name = buy.name;
        newBuy.bankCard = buy.bankCard;
        newBuy.enable = buy.enable;

        response.render('shop', {
          data: newBuy,
          errors : error
        });
        return;
      }
    buyC = buy;
    response.redirect('/success');
  }
  @Get('success')
  @Render('success')
  loadSuccess(){
    if(statSync('data.csv').size != 0)  appendFileSync('data.csv',"\n");
    appendFileSync('data.csv',`${buyC.name};${buyC.bankCard};`);
  }
}
