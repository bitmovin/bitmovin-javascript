import * as urljoin from 'url-join';

import {utils} from './http';

export const buildListUrl = (url, limit, offset, sort, filter) => {
  const filterParams = utils.buildFilterParamString(filter);
  const getParams = utils.buildGetParamString({
    ...filterParams,
    limit,
    offset,
    sort
  });
  if (getParams.length > 0) {
    return urljoin(url, getParams);
  }
  return url;
};
