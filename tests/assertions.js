import bluebird from 'bluebird';
export const mockGet = jest.fn().mockReturnValue(Promise.resolve({}));
export const mockPost = jest.fn().mockReturnValue(Promise.resolve({}));
export const mockDelete = jest.fn().mockReturnValue(Promise.resolve({}));
export const mockHttp = { get: mockGet, post: mockPost, delete_: mockDelete };

export const methodToMock = (method) => {
  if (method.toLowerCase() === 'get')
    return mockGet;
  if (method.toLowerCase() === 'delete')
    return mockDelete;
  return mockPost;
}


export const testSetup = () => {
  mockGet.mockClear();
  mockPost.mockClear();
  mockDelete.mockClear();
}

export const assertPayload = (mock, call, expectedPayload) => {
  it ('should send appropriate payload', () => {
    return call().then(() => {
      expect(mock.mock.calls[0][2]).toEqual(expectedPayload);
    });
  });
}
export const assertItReturnsPromise = (mock, call) => {
  it ('should return promise', () => {
    mock.mockReturnValue(Promise.resolve("success"));
    const retVal = call();
    expect(typeof retVal.then).toBe('function');
    return retVal;
  });
};
export const assertItReturnsCorrectResponse = (mock, call, expectedResponse) => {
  it ('should return correct response object', () => {
    const retVal = call();
    return retVal.then((response, rawResponse) => {
      expect(response).toEqual(expectedResponse);
    });
  });
};

export const assertItReturnsUnderlyingPromise = (mock, call) => {
  mock.mockReturnValue(Promise.resolve("success"));
  assertItReturnsCorrectResponse(mock, call, "success");
  assertItReturnsPromise(mock, call);
};

export const assertItCallsCorrectUrl = (method, expectedUrl, fn) => {
  it (`should call ${method} with URL ${expectedUrl} once`, () => {
    return fn().then(() => {
      expect(methodToMock(method)).toBeCalled();
    });
  });

  it (`should call ${method} with ${expectedUrl}`, () => {
    return fn().then(() => {
      expect(methodToMock(method).mock.calls[0][1]).toEqual(expect.stringMatching(expectedUrl));
    });
  });
}
export const assertItCallsUrlAndReturnsPromise = (method, url, fn) => {
  assertItCallsCorrectUrl(method, url, fn);
  assertItReturnsUnderlyingPromise(methodToMock(method), fn);
};
