import {settings} from '../../../bitmovin/analytics/organizations/settings';
import {
  assertItCallsCorrectUrl,
  assertItReturnsUnderlyingPromise,
  assertPayload,
  mockGet,
  mockHttp,
  mockPut,
  testSetup
} from '../../assertions';
import {getConfiguration} from '../../utils';

const testConfiguration = getConfiguration();
const ORG_ID = 'my-org-id';

describe('analytics', () => {
  const settingsClient = settings(testConfiguration, mockHttp);
  beforeEach(testSetup);

  describe('organizations', () => {
    describe('settings', () => {
      describe('details', () => {
        assertItCallsCorrectUrl('GET', `/v1/analytics/organizations/${ORG_ID}/settings`, () =>
          settingsClient(ORG_ID).details()
        );
        assertItReturnsUnderlyingPromise(mockGet, settingsClient(ORG_ID).details);
      });
      describe('update', () => {
        assertItCallsCorrectUrl('PUT', `/v1/analytics/organizations/${ORG_ID}/settings`, () =>
          settingsClient(ORG_ID).update({
            isIndustryOptOut: true,
            industry: 'IT',
            subIndustry: 'Broadcasting'
          })
        );
        assertItReturnsUnderlyingPromise(mockPut, settingsClient(ORG_ID).update);
        assertPayload(
          mockPut,
          () =>
            settingsClient(ORG_ID).update({
              isIndustryOptOut: true,
              industry: 'IT',
              subIndustry: 'Broadcasting'
            }),
          {
            isIndustryOptOut: true,
            industry: 'IT',
            subIndustry: 'Broadcasting'
          }
        );
      });
    });
  });
});
