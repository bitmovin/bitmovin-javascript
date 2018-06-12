class Builder {
  private query_: object;
  private aggregations_: object;
  private percentile: any;

  constructor(aggregations, query?) {
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

  public between(start, end) {
    return this.extendQuery_({start, end});
  }

  public interval(interval) {
    return this.extendQuery_({interval});
  }

  public filter(name, operator, value) {
    const filter = Object.freeze({name, operator, value});
    return this.extendQuery_({filters: Object.freeze([...this.query_.filters, filter])});
  }

  public groupBy(dimension) {
    return this.extendQuery_({groupBy: Object.freeze([...this.query_.groupBy, dimension])});
  }

  public orderBy(name, order) {
    const newOrder = Object.freeze({name, order});
    return this.extendQuery_({orderBy: Object.freeze([...this.query_.orderBy, newOrder])});
  }

  public percentile_(percentile) {
    return this.extendQuery_({percentile});
  }

  public licenseKey(licenseKey) {
    return this.extendQuery_({licenseKey});
  }

  public limit(limit) {
    return this.extendQuery_({limit});
  }

  public offset(offset) {
    return this.extendQuery_({offset});
  }

  public extendQuery_(extensions) {
    return new Builder(this.aggregations_, Object.freeze({...this.query_, ...extensions}));
  }

  public query() {
    const {target, ...queryAttrs} = this.query_;
    return target(queryAttrs);
  }
}

export default aggregations => new Builder(aggregations);
