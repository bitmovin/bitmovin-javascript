import {delete_, get, post} from '../../bitmovin/utils/http'

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

    return get(constMockConfiguration, 'http://someurl.com/some/resources', mockFetch).then(() => {
      expect(true).toEqual(true)
    }).catch((error) => {
      expect(false).toEqual(true)
    });
  });

  it('should reject the promise if the response status is > 399', () => {
    const constMockConfiguration = {
      httpHeaders: ['X-Api-Key: someApiKey'],
      requestTimeOut: 5000
    };

    const errorData = {
      requestId: '23e71f50-aca9-49be-8bb2-d50ee6b5cd35',
      status: 'ERROR',
      data: {
        code: 1001,
        message: 'An encoding with the given id does not exist',
        developerMessage: 'Id not found, check the encoding list for valid ids'
      }
    };

    const mockResponse = {
      status: 404,
      statusText: 'NOT FOUND',
      json: () => {
        return Promise.resolve(errorData);
      }
    };

    const mockFetch = jest.fn(() => {
      return Promise.resolve(mockResponse)
    });

    return get(constMockConfiguration, 'http://someurl.com/some/resources', mockFetch).then(() => {
      expect(false).toEqual(true)
    }).catch((bitmovinError) => {
      expect(bitmovinError.response.status).toEqual(mockResponse.status);
      expect(bitmovinError.response.statusText).toEqual(mockResponse.statusText);
      expect(bitmovinError.response.responseData).toEqual(errorData);
    });
  });

  it('Should resolve the response if status is 200',() => {
    const constMockConfiguration = {
      httpHeaders: ['X-Api-Key: someApiKey'],
      requestTimeOut: 5000
    };

    const successData = {
      requestId: '33fc02af-5b81-4948-81ef-71c999c017f2',
      status: 'SUCCESS',
      data: {
        result: {
          name: 'Production-ID-678',
          description: 'Project ID: 567',
          id: 'cb90b80c-8867-4e3b-8479-174aa2843f62',
          createdAt: '2016-06-25T20:09:23.69Z',
          modifiedAt: '2016-06-25T20:09:23.69Z'
        }
      }
    };

    const mockResponse = {
      status: 200,
      statusText: 'OK',
      json: () => {
        return Promise.resolve(successData);
      }
    };

    const mockFetch = jest.fn(() => {
      return Promise.resolve(mockResponse)
    });

    return get(constMockConfiguration, 'http://someurl.com/some/resources', mockFetch).then((response) => {
      expect(response).toEqual(successData.data.result);
    }).catch((error) => {
      expect(false).toEqual(true)
    });
  });

  it('should do a successfull post', () => {
    const constMockConfiguration = {
      httpHeaders: ['X-Api-Key: someApiKey'],
      requestTimeOut: 5000
    };

    const successData = {
      requestId: '33fc02af-5b81-4948-81ef-71c999c017f2',
      status: 'SUCCESS',
      data: {
        result: {
          name: 'Production-ID-678',
          description: 'Project ID: 567',
          id: 'cb90b80c-8867-4e3b-8479-174aa2843f62',
          createdAt: '2016-06-25T20:09:23.69Z',
          modifiedAt: '2016-06-25T20:09:23.69Z'
        }
      }
    };

    const mockResponse = {
      status: 200,
      statusText: 'OK',
      json: () => {
        return Promise.resolve(successData);
      }
    };

    const mockFetch = jest.fn(() => {
      return Promise.resolve(mockResponse)
    });

    const someObject = {
      foo: 'bar'
    };

    return post(constMockConfiguration, 'http://someurl.com/some/resources', someObject, mockFetch).then((response) => {
      expect(response).toEqual(successData.data.result);
    }).catch((error) => {
      expect(false).toEqual(true)
    });
  });

  it('should fail a post request with error code 400', () => {
    const constMockConfiguration = {
      httpHeaders: ['X-Api-Key: someApiKey'],
      requestTimeOut: 5000
    };

    const errorData = {
      requestId: '33fc02af-5b81-4948-81ef-71c999c017f2',
      status: 'ERROR',
      data: {
        code: 1001,
        message: 'Wrong parameters'
      }
    };

    const mockResponse = {
      status: 400,
      statusText: 'BAD_REQUEST',
      json: () => {
        return Promise.resolve(errorData);
      }
    };

    const mockFetch = jest.fn(() => {
      return Promise.resolve(mockResponse)
    });

    const someObject = {
      foo: 'bar'
    };

    return post(constMockConfiguration, 'http://someurl.com/some/resources', someObject, mockFetch).then((response) => {
      expect(false).toEqual(true)
    }).catch((bitmovinError) => {
      expect(bitmovinError.response.status).toEqual(mockResponse.status);
      expect(bitmovinError.response.statusText).toEqual(mockResponse.statusText);
      expect(bitmovinError.response.responseData).toEqual(errorData);
    });
  });

  it('should do a successfull delete', () => {
    const constMockConfiguration = {
      httpHeaders: ['X-Api-Key: someApiKey'],
      requestTimeOut: 5000
    };

    const successData = {
      requestId: '33fc02af-5b81-4948-81ef-71c999c017f2',
      status: 'SUCCESS',
      data: {
        result: {
          id: 'cb90b80c-8867-4e3b-8479-174aa2843f62',
        }
      }
    };

    const mockResponse = {
      status: 200,
      statusText: 'OK',
      json: () => {
        return Promise.resolve(successData);
      }
    };

    const mockFetch = jest.fn(() => {
      return Promise.resolve(mockResponse)
    });

    return delete_(constMockConfiguration, 'http://someurl.com/some/resources', mockFetch).then((response) => {
      expect(response).toEqual(successData.data.result);
    }).catch((error) => {
      expect(false).toEqual(true)
    });
  });

  it('should fail a delete request with error code 400', () => {
    const constMockConfiguration = {
      httpHeaders: ['X-Api-Key: someApiKey'],
      requestTimeOut: 5000
    };

    const errorData = {
      requestId: '33fc02af-5b81-4948-81ef-71c999c017f2',
      status: 'ERROR',
      data: {
        code: 1001,
        message: 'Id not found'
      }
    };

    const mockResponse = {
      status: 404,
      statusText: 'NOT_FOUND',
      json: () => {
        return Promise.resolve(errorData);
      }
    };

    const mockFetch = jest.fn(() => {
      return Promise.resolve(mockResponse)
    });

    return delete_(constMockConfiguration, 'http://someurl.com/some/resources', mockFetch).then((response) => {
      expect(false).toEqual(true)
    }).catch((bitmovinError) => {
      expect(bitmovinError.response.status).toEqual(mockResponse.status);
      expect(bitmovinError.response.statusText).toEqual(mockResponse.statusText);
      expect(bitmovinError.response.responseData).toEqual(errorData);
    });
  })

});
