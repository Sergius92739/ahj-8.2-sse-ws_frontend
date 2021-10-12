/* eslint-disable class-methods-use-this */
export default class Api {
  constructor(url) {
    this.url = url;
    this.contentTypeHeader = { 'Content-Type': 'application/json' };
  }

  add(data) {
    const options = {
      url: `${this.url}/instances/add`,
      settigs: {
        body: JSON.stringify(data),
        method: 'POST',
        headers: this.contentTypeHeader,
      },
    };
    return this.createRequest(options);
  }

  changeStatus(data) {
    const options = {
      url: `${this.url}/instances/stateChange`,
      settigs: {
        body: JSON.stringify(data),
        method: 'POST',
        headers: this.contentTypeHeader,
      },
    };
    return this.createRequest(options);
  }

  delete(data) {
    const options = {
      url: `${this.url}/instances/delete/${data.id}/${data.command}`,
      settigs: {
        method: 'DELETE',
        headers: this.contentTypeHeader,
      },
    };
    return this.createRequest(options);
  }

  createRequest(options) {
    return fetch(options.url, options.settigs);
  }
}
