import urljoin from 'url-join';

class Builder {
  constructor(target, dimension) {
    this.target_ = target;
    this.query_ = {
      filters: [],
      groupBy: [],
      orderBy: [],
      dimension
    };
    this.that_ = this
  }
  between(start, end) {
    this.query_ = {
      ...this.query_,
      start, end
    }
    return this;
  }
  interval(int) {
    this.query_ = {
      ...this.query_,
      interval: int
    }
    return this;
  }
  filter(dimension, operator, value) {
    this.query_ = {
      ...this.query_,
      filters: [
        ...this.query_.filters,
        {
          name: dimension,
          operator: operator,
          value: value
        }
      ]
    }
    return this;
  }
  groupBy(dimension) {
    this.query_ = {
      ...this.query_,
      groupBy: [
        ...this.query_.groupBy,
        dimension
      ]
    }
    return this;
  }
  orderBy(dimension, direction) {
    this.query_ = {
      ...this.query_,
      orderBy: [
        ...this.query_.orderBy,
        {
          name: dimension,
          order: direction
        }
      ]
    }
    return this;
  }
  percentile(percentile) {
    this.query_ = {
      ...this.query_,
      percentile
    }
    return this;
  }
  licenseKey(licenseKey) {
    this.query_ = {
      ...this.query_,
      licenseKey
    }
    return this;
  }
  limit(limit) {
    this.query_ = {
      ...this.query_,
      limit
    }
    return this;
  }
  offset(offset) {
    this.query_ = {
      ...this.query_,
      offset
    }
    return this;
  }
  query() {
    return this.target_(this.query_)
  }
}

export const queryBuilder = (queries) => {
  const fn = {};
  fn.max = (dimension) => {
    return new Builder(queries.max, dimension);
  }
  fn.min = (dimension) => {
    return new Builder(queries.min, dimension);
  }
  fn.avg = (dimension) => {
    return new Builder(queries.avg, dimension);
  }
  fn.sum = (dimension) => {
    return new Builder(queries.sum, dimension);
  }
  fn.count = (dimension) => {
    return new Builder(queries.count, dimension);
  }
  fn.median = (dimension) => {
    return new Builder(queries.median, dimension);
  }
  fn.variance = (dimension) => {
    return new Builder(queries.variance, dimension);
  }
  fn.percentile = (dimension, percentile) => {
    return new Builder(queries.percentile, dimension).percentile(percentile);
  }
  fn.stddev = (dimension) => {
    return new Builder(queries.stddev, dimension);
  }
  return fn
}


export default (queries) => { return queries(queries); };
