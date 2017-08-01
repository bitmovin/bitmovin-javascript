import {get} from '../../bitmovin/http'

describe('Test HTTP Client', () => {
  it('should resolve the promise if the response status is 204', () => {

    const constMockConfiguration = {
      httpHeaders: ['X-Api-Key: someApiKey'],
      requestTimeOut: 5000
    };

    const mockResponse = {
      status: 204
    };
    const mockFetch = jest.fn(() => {
      return Promise.resolve(mockResponse)
    });

    return get(constMockConfiguration, "http://someurl.com/some/resources", mockFetch).then(() => {
      expect(true).toEqual(true)
    }).catch((error) => {
      expect(false).toEqual(true)
    });
  });
});