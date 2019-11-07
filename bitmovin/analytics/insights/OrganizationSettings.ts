import * as urljoin from 'url-join';

import http from '../../utils/http';
import {HttpClient, InternalConfiguration} from '../../utils/types';

export interface Settings {
  orgId: string;
  includeInInsights: boolean;
  industry: string;
  subIndustry: string;
  isTrial: boolean;
}

export default class OrganizationSettings {
  private baseUrl: string;

  constructor(private configuration: InternalConfiguration, urlPath: string, private httpClient: HttpClient = http) {
    this.configuration = configuration;
    this.baseUrl = urljoin(configuration.apiBaseUrl, urlPath, 'organizations');
  }

  public settings(orgId: string) {
    return {
      details: (): Promise<Settings> => {
        return this.httpClient.get(this.configuration, urljoin(this.baseUrl, orgId, 'settings'));
      },
      update: (settings: {includeInInsights: boolean}): Promise<Settings> => {
        return this.httpClient.put(this.configuration, urljoin(this.baseUrl, orgId, 'settings'), settings);
      }
    };
  }
}
