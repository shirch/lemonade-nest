import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly words: Map<string, number> = new Map();

  async count(url: string): Promise<void> {
    const res = await axios.get(url, { responseType: 'stream' });
    const body = res.data as NodeJS.ReadableStream;
    if (!body) throw new Error('No response body');

    let leftover = '';

    await new Promise<void>((resolve, reject) => {
      body.on('data', (chunk: Buffer) => {
        const text = leftover + chunk.toString('utf8');
        const words = text.replace(/[-,]/g, ' ').split(/\W+/);
        leftover = words.pop() || '';
        this.processAndCountWords(words.join(' '));
      });
      body.on('end', () => {
        if (leftover) {
          this.processAndCountWords(leftover);
        }
        resolve();
      });
      body.on('error', reject);
    });
    console.log({ words: Array.from(this.words.entries()) });
  }

  processAndCountWords(text: string): void {
    const words = text.replace(/[-,]/g, ' ').split(/\W+/);
    for (const word of words) {
      if (!word || !/^[a-zA-Z]+$/.test(word)) continue;
      const lower = word.toLowerCase();
      this.words.set(lower, (this.words.get(lower) || 0) + 1);
    }
  }

  getCount(word: string): number {
    return this.words.get(word.toLowerCase()) || 0;
  }
}
