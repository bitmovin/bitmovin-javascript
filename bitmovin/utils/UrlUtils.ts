import {utils} from './http';
import * as urljoin from 'url-join';

export const buildListUrl = (url, limit, offset, sort, filter) => {
  const filterParams = utils.buildFilterParamString(filter);
  let getParams = utils.buildGetParamString({
    ...filterParams,
    limit: limit,
    offset: offset,
    sort: sort
  });
  if (getParams.length > 0) {
    return urljoin(url, getParams);
  }
  return url;
};