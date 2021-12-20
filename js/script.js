"use strict";

import tabs   from './modules/tabs';
import modal  from './modules/modal';
import timer  from './modules/timer';
import calc   from './modules/calculator';
import forms  from './modules/forms';
import slider from './modules/slider';
import cards  from './modules/cards';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => { 
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
    const deadline = '2021-12-31';

    tabs('.tabheader__items', '.tabcontent', '.tabheader__item', 'tabheader__item_active');
    cards();
    timer('.timer', deadline);
    modal('[data-modal]', '.modal', modalTimerId);
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide'
    });
});