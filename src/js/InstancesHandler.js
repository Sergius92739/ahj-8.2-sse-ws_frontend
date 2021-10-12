import Api from './Api';
import Markup from './Markup';

export default class InstancesHandler {
  constructor(element) {
    if (typeof element === 'string') {
      this.container = document.querySelector(element);
    }
    this.container = element;
    this.worklog = this.container.querySelector('[data-name="worklog"]');
    this.instances = this.container.querySelector('[data-name="instances"]');
    this.creatInstanceBtn = this.container.querySelector('.link');
    this.api = new Api('https://ahj-8-2-sse-ws-sergius.herokuapp.com');
    this.sse = new EventSource('https://ahj-8-2-sse-ws-sergius.herokuapp.com/sse');
    this.intervals = new Map();

    this.getSseData = this.getSseData.bind(this);
    this.onCreateLinkClick = this.onCreateLinkClick.bind(this);
    this.onInstanceClick = this.onInstanceClick.bind(this);
  }

  init() {
    this.creatInstanceBtn.addEventListener('click', this.onCreateLinkClick);
    this.sse.addEventListener('message', this.getSseData);
    this.instances.addEventListener('click', this.onInstanceClick);
  }

  getSseData(evt) {
    if (evt.data) {
      const data = JSON.parse(evt.data);
      if (data.info) {
        this.drawLog(data);
      }
      if (data.action === 'created') {
        this.drawInstance(data.instance);
      }
      if (data.action === 'started') {
        this.startInstance(data.instance);
      }
      if (data.action === 'stopped') {
        this.stopInstance(data.instance);
      }
      if (data.action === 'removed') {
        this.deleteInstance(data.instance);
      }
    }
  }

  deleteInstance(data) {
    this.container.querySelector(`[data-id="${data.id}"]`).remove();
  }

  stopInstance(data) {
    const instance = this.instances.querySelector(`[data-id="${data.id}"]`);
    const status = instance.querySelector('.item-status__state');
    const indicator = instance.querySelector('.item-status__indicator');
    const startBtn = instance.querySelector('[data-name="started"]');
    const stopBtn = instance.querySelector('[data-name="stopped"]');
    status.textContent = data.state;
    startBtn.classList.remove('visually_hidden');
    stopBtn.classList.add('visually_hidden');
    this.cancelFlashing(indicator, instance.dataset.id);
  }

  startInstance(data) {
    const instance = this.instances.querySelector(`[data-id="${data.id}"]`);
    const status = instance.querySelector('.item-status__state');
    const indicator = instance.querySelector('.item-status__indicator');
    const startBtn = instance.querySelector('[data-name="started"]');
    const stopBtn = instance.querySelector('[data-name="stopped"]');
    status.textContent = data.state;
    startBtn.classList.add('visually_hidden');
    stopBtn.classList.remove('visually_hidden');
    this.getFlashing(indicator, instance.dataset.id);
  }

  getFlashing(element, id) {
    const interval = setInterval(() => {
      element.classList.toggle('running');
    }, 200);
    this.intervals.set(id, interval);
  }

  cancelFlashing(element, id) {
    clearInterval(this.intervals.get(id));
    this.intervals.delete(id);
    // eslint-disable-next-line no-param-reassign
    element.className = 'item-status__indicator';
  }

  drawInstance(data) {
    this.instances.insertAdjacentHTML(
      'beforeend',
      Markup.instance(data.id, data.state),
    );
  }

  drawLog(data) {
    this.worklog.insertAdjacentHTML(
      'beforeend',
      Markup.log(data.date, data.server, data.info),
    );
  }

  onInstanceClick(evt) {
    if (evt.target.dataset.name === 'started'
      || evt.target.dataset.name === 'stopped') {
      this.onActionsBtnClick(evt, this.api.changeStatus.bind(this.api));
    }
    if (evt.target.dataset.name === 'removed') {
      this.onActionsBtnClick(evt, this.api.delete.bind(this.api));
    }
  }

  async onCreateLinkClick(evt) {
    evt.preventDefault();
    const response = await this.api.add({ command: evt.target.dataset.name });
    this.getResponse(response);
  }

  async onActionsBtnClick(evt, callback) {
    const { id } = evt.target.closest('.column__item').dataset;
    const response = await callback({
      id,
      command: evt.target.dataset.name,
    });
    this.getResponse(response);
  }

  async getResponse(response) {
    if (response.ok) {
      this.json = await response.json();
      return this.json;
    }
    return response.status;
  }
}
