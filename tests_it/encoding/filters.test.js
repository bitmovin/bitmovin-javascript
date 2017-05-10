import assert from 'assert';

import {getConfiguration} from '../utils';
import filters from '../../bitmovin/encoding/filters';

let testConfiguration = getConfiguration();

const sampleCropFilter = {
  name       : 'Sample Crop Filter',
  description: 'bitmovin-javascript sample crop filter filters.test.js',
  left       : 10,
  top        : 10,
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

const sampleDeinterlaceFilter = {
  name       : 'Sample Deinterlace Filter',
  description: 'bitmovin-javascript sample deinterlace filter filters.test.js',
  mode       : 'FIELD',
  parity     : 'AUTO',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

const sampleRotateFilter = {
  name       : 'Sample Rotate Filter',
  description: 'bitmovin-javascript sample rotate filter filters.test.js',
  rotation   : 90,
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

const sampleWatermarkFilter = {
  name       : 'Sample Watermark Filter',
  description: 'bitmovin-javascript sample watermark filter filters.test.js',
  right      : 10,
  top        : 10,
  image      : 'http://bitmovin.com/favicon.ico',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

describe('[Filters]', () => {

  let filtersClient = filters(testConfiguration);

  it('should return a list of filters', (done) => {
    filtersClient.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.previous !== null) && response.previous !== undefined);
      assert((response.next !== null) && response.next !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a watermark filter', (done) => {
    filtersClient.watermark.create(sampleWatermarkFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareWatermarkFilters(response, sampleWatermarkFilter);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list watermark filters', (done) => {
    filtersClient.watermark.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get watermark filter details', (done) => {
    filtersClient.watermark.create(sampleWatermarkFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareWatermarkFilters(response, sampleWatermarkFilter);
      return filtersClient.watermark(response.id).details();
    }).then((detailsResponse) => {
      compareWatermarkFilters(detailsResponse, sampleWatermarkFilter);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get watermark filter custom data', (done) => {
    filtersClient.watermark.create(sampleWatermarkFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareWatermarkFilters(response, sampleWatermarkFilter);
      return filtersClient.watermark(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleWatermarkFilter.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete a watermark filter', (done) => {
    let createdFilter = undefined;

    filtersClient.watermark.create(sampleWatermarkFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareWatermarkFilters(response, sampleWatermarkFilter);
      createdFilter = response;
      return filtersClient.watermark(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdFilter.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a rotate filter', (done) => {
    filtersClient.rotate.create(sampleRotateFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareRotateFilters(response, sampleRotateFilter);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list rotate filters', (done) => {
    filtersClient.rotate.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get rotate filter details', (done) => {
    filtersClient.rotate.create(sampleRotateFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareRotateFilters(response, sampleRotateFilter);
      return filtersClient.rotate(response.id).details();
    }).then((detailsResponse) => {
      compareRotateFilters(detailsResponse, sampleRotateFilter);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get rotate filter custom data', (done) => {
    filtersClient.rotate.create(sampleRotateFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareRotateFilters(response, sampleRotateFilter);
      return filtersClient.rotate(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleRotateFilter.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete a rotate filter', (done) => {
    let createdFilter = undefined;

    filtersClient.rotate.create(sampleRotateFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareRotateFilters(response, sampleRotateFilter);
      createdFilter = response;
      return filtersClient.rotate(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdFilter.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a crop filter', (done) => {
    filtersClient.crop.create(sampleCropFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareCropFilters(response, sampleCropFilter);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list crop filters', (done) => {
    filtersClient.crop.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get crop filter details', (done) => {
    filtersClient.crop.create(sampleCropFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareCropFilters(response, sampleCropFilter);
      return filtersClient.crop(response.id).details();
    }).then((detailsResponse) => {
      compareCropFilters(detailsResponse, sampleCropFilter);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get crop filter custom data', (done) => {
    filtersClient.crop.create(sampleCropFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareCropFilters(response, sampleCropFilter);
      return filtersClient.crop(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleCropFilter.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete a crop filter', (done) => {
    let createdFilter = undefined;

    filtersClient.crop.create(sampleCropFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareCropFilters(response, sampleCropFilter);
      createdFilter = response;
      return filtersClient.crop(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdFilter.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create a deinterlace filter', (done) => {
    filtersClient.deinterlace.create(sampleDeinterlaceFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareDeinterlaceFilters(response, sampleDeinterlaceFilter);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list deinterlace filters', (done) => {
    filtersClient.deinterlace.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get deinterlace filter details', (done) => {
    filtersClient.deinterlace.create(sampleDeinterlaceFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareDeinterlaceFilters(response, sampleDeinterlaceFilter);
      return filtersClient.deinterlace(response.id).details();
    }).then((detailsResponse) => {
      compareDeinterlaceFilters(detailsResponse, sampleDeinterlaceFilter);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get deinterlace filter custom data', (done) => {
    filtersClient.deinterlace.create(sampleDeinterlaceFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareDeinterlaceFilters(response, sampleDeinterlaceFilter);
      return filtersClient.deinterlace(response.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleDeinterlaceFilter.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete a deinterlace filter', (done) => {
    let createdFilter = undefined;

    filtersClient.deinterlace.create(sampleDeinterlaceFilter).then((response) => {
      assert((response.id !== null) && (response.id !== undefined) && response.id !== '');
      compareDeinterlaceFilters(response, sampleDeinterlaceFilter);
      createdFilter = response;
      return filtersClient.deinterlace(response.id).delete();
    }).then((deleteResponse) => {
      assert.equal(deleteResponse.id, createdFilter.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  const compareCropFilters = (filterOne, filterTwo) => {
    assert.equal(filterOne.name, filterTwo.name);
    assert.equal(filterOne.description, filterTwo.description);
    assert.equal(filterOne.left, filterTwo.left);
    assert.equal(filterOne.right, filterTwo.right);
    assert.equal(filterOne.top, filterTwo.top);
    assert.equal(filterOne.bottom, filterTwo.bottom);
  };

  const compareDeinterlaceFilters = (filterOne, filterTwo) => {
    assert.equal(filterOne.name, filterTwo.name);
    assert.equal(filterOne.description, filterTwo.description);
    assert.equal(filterOne.mode, filterTwo.mode);
    assert.equal(filterOne.parity, filterTwo.parity);
  };

  const compareRotateFilters = (filterOne, filterTwo) => {
    assert.equal(filterOne.name, filterTwo.name);
    assert.equal(filterOne.description, filterTwo.description);
    assert.equal(filterOne.rotation, filterTwo.rotation);
  };

  const compareWatermarkFilters = (filterOne, filterTwo) => {
    assert.equal(filterOne.name, filterTwo.name);
    assert.equal(filterOne.description, filterTwo.description);
    assert.equal(filterOne.image, filterTwo.image);
    assert.equal(filterOne.left, filterTwo.left);
    assert.equal(filterOne.right, filterTwo.right);
    assert.equal(filterOne.top, filterTwo.top);
    assert.equal(filterOne.bottom, filterTwo.bottom);
  };
});