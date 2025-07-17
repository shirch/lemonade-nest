import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('words')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Accepts: { "url": "http://norvig.com/big.txt" }
   * curl -X POST http://localhost:3000/words \
   *   -H 'Content-Type: application/json' \
   *   -d '{"url": "http://norvig.com/big.txt"}'
   */
  @Post()
  countFromUrl(@Body() body: { url: string }): void {
    const url = body.url;
    this.appService.count(url);
  }

  @Get(':word')
  getWordCount(@Param('word') word: string): number {
    return this.appService.getCount(word);
  }
}
