import http, { utils } from '../../bitmovin/utils/http';
describe('Tests creation of url out of given parameters', () => {
  describe('Test Url creation with limit, offset and sorting', () => {
    it('Test with given limit', () => {
      const limit = "100";
      expect(utils.buildGetParamString({
        limit: limit
      })).toEqual("?limit=100")
    });

    it('Test with given offset', () => {
      const offset = "0";
      expect(utils.buildGetParamString({
        offset: offset
      })).toEqual("?offset=0")
    });

    it('Test with given limit and offset', () => {
      const limit = "100";
      const offset = "0";
      expect(utils.buildGetParamString({
        limit: limit,
        offset: offset
      })).toEqual("?limit=100&offset=0")
    });

    it('Test with given sorting', () => {
      const sort = "createdAt:ASC";
      expect(utils.buildGetParamString({
        sort: sort
      })).toEqual("?sort=createdAt:ASC")
    });

    it('Test with limit, offset and sorting', () => {
      const sort = "createdAt:ASC";
      const limit = "100";
      const offset = "0";
      expect(utils.buildGetParamString({
        limit: limit,
        offset: offset,
        sort: sort
      })).toEqual("?limit=100&offset=0&sort=createdAt:ASC")
    });

  });

  describe('Test Url creation with given filtering', () => {
    it('Test with one filter', () => {
      const filterParams = utils.buildFilterParamString({
        type: [ 'VOD' ]
      });

      expect(utils.buildGetParamString(
          filterParams
      )).toEqual('?type=VOD');
    });

    it('Test with two filters', () => {
      const filterParams = utils.buildFilterParamString({
        type: [ 'VOD' ],
        status: ['RUNNING']
      });

      expect(utils.buildGetParamString(
        filterParams
      )).toEqual('?type=VOD&status=RUNNING');
    });

    it('Test with two filters and limit and offset', () => {
      const limit = "100";
      const offset = "0";
      const filterParams = utils.buildFilterParamString({
        type: [ 'VOD' ],
        status: ['RUNNING']
      });

      expect(utils.buildGetParamString({
          limit: limit,
          offset: offset,
          ...filterParams
        }
      )).toEqual('?limit=100&offset=0&type=VOD&status=RUNNING');
    })
  });

  describe('Test filter parameter', () => {
    it('Test with one single Filter', () => {
      const filterParams = {
        type: [
          'VOD'
        ]
      };
      expect(utils.buildFilterParamString(filterParams)).toEqual({
        type: 'VOD'
      });
    });

    it('Test with double Filter', () => {
      const filterParams = {
        type: [
          'VOD',
          'LIVE'
        ]
      };
      expect(utils.buildFilterParamString(filterParams)).toEqual({
        type: 'VOD,LIVE'
      });
    });

    it('Test with two Filters', () => {
      const filterParams = {
        type: [
          'VOD'
        ],
        status: [
          'RUNNING'
        ]
      };
      expect(utils.buildFilterParamString(filterParams)).toEqual({
        type: 'VOD',
        status: 'RUNNING'
      });
    });
  })
});