import { writeFileSync, existsSync, promises as fs } from 'fs';
import path from 'path';
import { Http } from '../network/http';

export class CountryService {
  private url;
  private cachePath;
  private countryData = {};
  constructor(private http: Http) {
    this.url = 'https://restcountries.com/v2/alpha';
    this.cachePath = path.resolve(__dirname, '../../../data/Countries.json');
    this.createCachFileIfNotExists();
    this.populateCache();
  }

  private createCachFileIfNotExists() {
    if (!existsSync(this.cachePath)) {
      writeFileSync(this.cachePath, JSON.stringify({}));
    }
  }

  private populateCache() {
    this.countryData = require(this.cachePath);
  }

  private async deleteCache() {
    await fs.unlink(this.cachePath);
  }

  private async saveCache() {
    await fs.writeFile(this.cachePath, JSON.stringify(this.countryData));
  }

  public async getDataByCode(
    countryCode: string,
    options?: {
      fromCache: boolean;
    },
  ) {
    // setting fromCache option to default true
    options = { fromCache: true, ...options };

    // looking into the cache first
    try {
      if (options.fromCache && this.countryData[countryCode]) {
        return countryCode;
      }

      // Fetch country data from API call
      this.http.setUrl(this.url + '/' + countryCode);
      const country = await this.http.get();

      // Regenerate cache and return
      this.countryData[countryCode] = country;
      await this.deleteCache();
      await this.saveCache();

      return country;
    } catch (error) {
      console.log(error);
      return {};
    }
  }
}

