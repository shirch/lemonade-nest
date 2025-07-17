import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('should count words correctly in processAndCountWords', () => {
    service.processAndCountWords('This country is a  country');
    expect(service.getCount('this')).toBe(1);
    expect(service.getCount('country')).toBe(2);
    expect(service.getCount('is')).toBe(1);
    expect(service.getCount('a')).toBe(1);
    expect(service.getCount('notaword')).toBe(0);
  });

  it('should accumulate counts when processAndCountWords is called multiple times', () => {
    service.processAndCountWords('This country is a  country');
    service.processAndCountWords('This country is a  country');
    expect(service.getCount('this')).toBe(2);
    expect(service.getCount('country')).toBe(4);
    expect(service.getCount('is')).toBe(2);
    expect(service.getCount('a')).toBe(2);
    expect(service.getCount('notaword')).toBe(0);
  });

  it('should treat words as case insensitive and handle mid-word dashes/commas', () => {
    service.processAndCountWords('Count-ry, country, COUNTRY, count,ry');
    // "Count-ry" and "count,ry" should be split into "count" and "ry"
    // All forms of "country" should be counted as the same word
    expect(service.getCount('country')).toBe(2); // country, country, COUNTRY
    expect(service.getCount('count')).toBe(2); // count, Count-ry (split)
    expect(service.getCount('ry')).toBe(2); // Count-ry (split), count,ry (split)
  });

  it('should count "Country" and "country" as the same word (case insensitive)', () => {
    service.processAndCountWords('Country country COUNTRY');
    expect(service.getCount('country')).toBe(3);
  });

  it('should count words from a real URL (http://norvig.com/big.txt)', async () => {
    jest.setTimeout(20000); // Increase timeout for network
    await service.count('http://norvig.com/big.txt');
    await service.count('http://norvig.com/big.txt');

    // Check that a nonsense word is not present
    expect(service.getCount('country')).toBe(846);
  });
});
