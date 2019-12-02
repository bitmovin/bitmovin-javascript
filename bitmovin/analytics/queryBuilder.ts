class Builder {
  private queryObj: {
    target: any;
    filters: any[];
    groupBy: any[];
    orderBy: any[];
  };
  private aggregations: any;
  private percentile: any;

  constructor(aggregations, query?) {
    this.aggregations = aggregations;
    this.queryObj =
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

  public includeContext(includeContext) {
    return this.extendQuery_({includeContext});
  }

  public filter(name, operator, value) {
    const filter = Object.freeze({name, operator, value});
    return this.extendQuery_({filters: Object.freeze([...this.queryObj.filters, filter])});
  }

  public groupBy(dimension) {
    return this.extendQuery_({groupBy: Object.freeze([...this.queryObj.groupBy, dimension])});
  }

  public orderBy(name, order) {
    const newOrder = Object.freeze({name, order});
    return this.extendQuery_({orderBy: Object.freeze([...this.queryObj.orderBy, newOrder])});
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
    return new Builder(this.aggregations, Object.freeze({...this.queryObj, ...extensions}));
  }

  public query() {
    const {target, ...queryAttrs} = this.queryObj;
    return target(queryAttrs);
  }
}

export default aggregations => new Builder(aggregations);
