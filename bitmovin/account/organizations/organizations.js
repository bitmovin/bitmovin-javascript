/**
 * Created by ferdinand on 17.02.17.
 */

import urljoin from 'url-join';
import { get, post, delete_ } from '../../http';
import Promise from 'bluebird';

const organizations = (configuration) => {
  const organizationsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'organizations');

  let fn = (organizationId) => {
    return {
      details: () => {
        let url = urljoin(organizationsBaseUrl, organizationId);
        return new Promise((resolve, reject) => {
          get(configuration, url)
            .then((status, rawResponse) => {
              resolve(status);
            })
            .catch(error => {
              reject(error);
            });
        });
      },

      delete: () => {
        let url = urljoin(organizationsBaseUrl, organizationId);
        return new Promise((resolve, reject) => {
          delete_(configuration, url)
            .then((status, rawResponse) => {
              resolve(status);
            })
            .catch(error => {
              reject(error);
            });
        });
      }
    };
  };

  fn.add = (organization) => {
    const url = urljoin(organizationsBaseUrl);
    return new Promise((resolve, reject) => {
      post(configuration, url, organization)
        .then((status, rawResponse) => {
          resolve(status);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  fn.list = () => {
    const url = urljoin(organizationsBaseUrl);
    return new Promise((resolve, reject) => {
      get(configuration, url)
        .then((status, rawResponse) => {
          resolve(status);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  return fn;
};

export default organizations;
