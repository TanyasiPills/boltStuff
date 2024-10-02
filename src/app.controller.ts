import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

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
      products: this.items
    };
  }
}
