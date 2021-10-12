export default class Markup {
  static log(date, id, info) {
    return `<li class="column__point">
    <div class="point__date">${Markup.cleanDate(date)}</div>
    <div class="point__id">
      <span class="point-id__text">Server: </span>
      <span class="piont-id__id">${id}</span>
    </div>
    <div class="point__info">
      <span class="point-info__text">INFO: </span>
      <span class="point-info__info">${info}</span>
    </div>
  </li>`;
  }

  static instance(id, state) {
    return `<form data-id="${id}" class="column__item">
    <div class="item__id">
      <span class="item-id__text">ID:</span>
      <span class="item-id__id">${id}</span>
    </div>
    <div class="item__status">
      <span class="item-status__text">Status:</span>
      <span id="indicator" class="item-status__indicator"></span>
      <span class="item-status__state">${state}</span>
    </div>
    <div class="item__actions">
      <span class="item-actions__text">Actions:</span>
      <span data-name="started" class="item-actions__btn start"></span>
      <span data-name="stopped" class="item-actions__btn stop visually_hidden"></span>
      <span data-name="removed" class="item-actions__btn remove"></span>
    </div>
  </form>`;
  }

  static cleanDate(str) {
    const temp1 = str.split(' ');
    this.date = [temp1[1], temp1[0].slice(0, -1)].join(' ');
    return this.date;
  }
}
