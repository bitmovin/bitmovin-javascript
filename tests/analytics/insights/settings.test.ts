import OrganizationSettings from '../../../bitmovin/analytics/insights/OrganizationSettings';
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
const INSIGHTS_PATH = 'analytics/insights';

describe('analytics', () => {
  const settingsClient = new OrganizationSettings(testConfiguration, INSIGHTS_PATH, mockHttp);
  beforeEach(testSetup);

  describe('organizations', () => {
    describe('settings', () => {
      describe('details', () => {
        assertItCallsCorrectUrl('GET', `/v1/analytics/insights/organizations/${ORG_ID}/settings`, () =>
          settingsClient.settings(ORG_ID).details()
        );
        assertItReturnsUnderlyingPromise(mockGet, settingsClient.settings(ORG_ID).details);
      });
      describe('update', () => {
        assertItCallsCorrectUrl('PUT', `/v1/analytics/insights/organizations/${ORG_ID}/settings`, () =>
          settingsClient.settings(ORG_ID).update({
            includeInInsights: true
          })
        );
        assertItReturnsUnderlyingPromise(mockPut, settingsClient.settings(ORG_ID).update);
        assertPayload(
          mockPut,
          () =>
            settingsClient.settings(ORG_ID).update({
              includeInInsights: true
            }),
          {
            includeInInsights: true
          }
        );
      });
    });
  });
});
