import urljoin from 'url-join';

class Builder {
  constructor(queries) {
    this.query_ = {
      filters: [],
      groupBy: [],
      orderBy: [],
    };

    Object.keys(queries).forEach(key => {
      this[key] = (dimension) => {
        this.target_ = queries[key];
        this.query_.dimension = dimension;
        return this;
      }
    });
    const defaultPercentile = this.percentile;
    this.percentile = (dimension, percentile) => defaultPercentile(dimension)._percentile(percentile);
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
    console.log('percentile', percentile);
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
