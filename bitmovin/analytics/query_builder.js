import urljoin from 'url-join';

class Builder {
  constructor(queries) {
    this.queries = queries
    this.target_ = null;
    this.query_ = {
      filters: [],
      groupBy: [],
      orderBy: [],
    };

    this.max = this.max.bind(this);
    this.min = this.min.bind(this);
    this.avg = this.avg.bind(this);
    this.sum = this.sum.bind(this);
    this.count = this.count.bind(this);
    this.median = this.median.bind(this);
    this.variance = this.variance.bind(this);
    this.percentile = this.percentile.bind(this);
    this.stddev = this.stddev.bind(this);
  }
  max(dimension) {
    this.target_ = this.queries.max;
    this.query_.dimension = dimension;
    return this;
  }
  min(dimension) {
    this.target_ = this.queries.min;
    this.query_.dimension = dimension;
    return this;
  }
  avg(dimension) {
    this.target_ = this.queries.avg;
    this.query_.dimension = dimension;
    return this;
  }
  sum(dimension) {
    this.target_ = this.queries.sum;
    this.query_.dimension = dimension;
    return this;
  }
  count(dimension) {
    this.target_ = this.queries.count;
    this.query_.dimension = dimension;
    return this;
  }
  median(dimension) {
    this.target_ = this.queries.median;
    this.query_.dimension = dimension;
    return this;
  }
  variance(dimension) {
    this.target_ = this.queries.variance;
    this.query_.dimension = dimension;
    return this;
  }
  percentile(dimension, percentile) {
    this.target_ = this.queries.percentile;
    this.query_.dimension = dimension;
    return this._percentile(percentile);
  }
  stddev(dimension) {
    this.target_ = this.queries.stddev;
    this.query_.dimension = dimension;
    return this;
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
  _percentile(percentile) {
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
  return new Builder(queries);
}


export default (queries) => { return queries(queries); };
