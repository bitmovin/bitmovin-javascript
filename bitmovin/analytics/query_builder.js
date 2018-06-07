class Builder {
  constructor(aggregations, query) {
    this.aggregations_ = aggregations;
    this.query_ =
      query ||
      Object.freeze({
        filters: [],
        groupBy: [],
        orderBy: []
      });

    Object.keys(aggregations).forEach(key => {
      this[key] = dimension => this.extendQuery_({target: aggregations[key], dimension});
    });
    const defaultPercentile = this.percentile;
    this.percentile = (dimension, percentile) => defaultPercentile(dimension).percentile_(percentile);
  }

  between(start, end) {
    return this.extendQuery_({start, end});
  }

  interval(interval) {
    return this.extendQuery_({interval});
  }

  filter(name, operator, value) {
    const filter = Object.freeze({name, operator, value});
    return this.extendQuery_({filters: Object.freeze([...this.query_.filters, filter])});
  }

  groupBy(dimension) {
    return this.extendQuery_({groupBy: Object.freeze([...this.query_.groupBy, dimension])});
  }

  orderBy(name, order) {
    const newOrder = Object.freeze({name, order});
    return this.extendQuery_({orderBy: Object.freeze([...this.query_.orderBy, newOrder])});
  }

  percentile_(percentile) {
    return this.extendQuery_({percentile});
  }

  licenseKey(licenseKey) {
    return this.extendQuery_({licenseKey});
  }

  limit(limit) {
    return this.extendQuery_({limit});
  }

  offset(offset) {
    return this.extendQuery_({offset});
  }

  extendQuery_(extensions) {
    return new Builder(this.aggregations_, Object.freeze({...this.query_, ...extensions}));
  }

  query() {
    const {target, ...queryAttrs} = this.query_;
    return target(queryAttrs);
  }
}

export default aggregations => new Builder(aggregations);
