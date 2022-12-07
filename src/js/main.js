/* eslint-disable operator-linebreak */
/* eslint-disable no-inner-declarations */

const viewportFix = (width) => {
  const meta = $('meta[name="viewport"]');
  meta.attr('content', 'user-scalable=no, width=' + (screen.width <= width ? width : 'device-width'));
};

viewportFix(375);

$('[data-fancybox]').fancybox({
  touch: false,
  autoFocus: false,
  backFocus: false,
  closeExisting: true,
});

const maskPhone = () => {
  const maskedElements = [];
  const el = document.querySelectorAll('.masked');
  if (el.length > 0) {
    const mask = {
      mask: '+7 (000) 000-00-00',
    };
    el.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target.value === '') item.value = '+7 ';
        maskedElements.push(new IMask(item, mask));
      });
    });
  }
};

maskPhone();

const promoSlider = new Swiper('.promo-slider', {
  pagination: {
    el: '.promo-count',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.promo-next',
    prevEl: '.promo-prev',
  },
});

const specialSlider = new Swiper('.special-slider', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,
  pagination: {
    el: '.special-count',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.special-next',
    prevEl: '.special-prev',
  },
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
  breakpoints: {
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    576: {
      noSwiping: true,
    },
  },
});

const benefitSlider = new Swiper('.benefit-slider', {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: '.benefit-count',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.benefit-next',
    prevEl: '.benefit-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
  },
});

const triplets = (str) => {
  return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u202f');
};

const tripletsString = document.querySelectorAll('.triplets');
tripletsString.forEach((string) => {
  string.innerHTML = triplets(string.innerHTML);
});

$('.catalog-section__list-open, .catalog-section__list-close').click(function () {
  $('.catalog-section__list-content').slideToggle(300);
  $('.catalog-section__list-open').slideToggle(300);
});

$('.item-spec__tabs li').click(function () {
  const id = $(this).attr('data-id');

  $('.item-spec__tabs li').removeClass('active');
  $(this).addClass('active');

  $('.item-spec__tab').removeClass('active');
  $('.item-spec__tab[data-id=' + id + ']').addClass('active');
});

$('.catalog-section__grid div').click(function () {
  $('.catalog-section__grid div').removeClass('active');
  $(this).addClass('active');

  if ($('.catalog-section__grid-simple').hasClass('active')) {
    $('.catalog-section__result').addClass('catalog-section__simple');
  } else {
    $('.catalog-section__result').removeClass('catalog-section__simple');
  }
});

$('.order-delivery__type input').click(function () {
  const type = $(this).attr('data-type');

  $('.order-delivery__address-item').removeClass('active');
  $('.order-delivery__address-item[data-type=' + type + ']').addClass('active');
});

$('.order-toggle').click(function () {
  $(this).toggleClass('entity');
  $('#entity').toggle();
  $('#individual').toggle();
});

$('.header-buttons__cart').hover(function () {
  $('.header-cart').slideDown(200);
});

$('.header').mouseleave(function () {
  $('.header-cart').slideUp(200);
});

if ($('body').width() >= 1024) {
  $('.js-catalog').hover(function () {
    $('.header-catalog').slideDown(200);
    $('.js-catalog').addClass('active');
  });

  $('.header').mouseleave(function () {
    $('.header-catalog').slideUp(200);
    $('.js-catalog').removeClass('active');
  });

  $('.header-catalog__main li').hover(function () {
    const dropdown = $(this).attr('data-menu');
    $('.header-catalog__sub').hide();
    $('.header-catalog__sub[data-menu=' + dropdown + ']').show();

    $('.header-catalog__main li').removeClass('active');
    $(this).addClass('active');
  });
}

$('.js-open-menu').one('click', false);

$('.js-open-menu').click(function () {
  $(this).next('.header-burger__submenu').slideDown(200);
});

$('.header-buttons__burger, .header-burger__close').click(function () {
  $('.header-burger').fadeToggle(200);
  $('body').toggleClass('overflow');
});

$('.catalog-section__filter-btn').click(function () {
  $('.catalog-section__filter').slideToggle();
});

$('.js-calc').each(function (i, item) {
  const formCalc = $(item).find('.js-calc__form');

  const thickness = formCalc.data('thickness') / 1000;
  const width = formCalc.data('width') / 1000;
  const length = formCalc.data('length') / 1000;
  const scoringWidth = formCalc.data('scoring-width') / 1000;
  const usableWidth = formCalc.data('usable-width') / 1000;
  const effectiveArea = scoringWidth * length;

  let squareFormula = scoringWidth * length;
  usableWidth === '' || usableWidth === 0 ? (squareFormula = scoringWidth * length) : (squareFormula = usableWidth * length);

  const cubicFormula = ((scoringWidth * length) / effectiveArea) * thickness * width * length;

  const price = formCalc.data('price');
  $('.catalog-item__price-pieces', item).text(triplets(price));
  $('.catalog-item__price-square', item).text(triplets((price / squareFormula).toFixed()));
  $('.catalog-item__price-cubic', item).text(triplets((price / cubicFormula).toFixed()));

  $('input', formCalc).on('keyup', function () {
    const inputValue = $(this).val();
    const inputType = $(this).data('type');

    const runningFormula = ((inputValue * cubicFormula) / length).toFixed(2);
    const piecesFormula = Math.ceil(inputValue / cubicFormula);

    const diff = scoringWidth * length - usableWidth * length;
    let diffTotal = 1;
    diff === scoringWidth * length ? (diffTotal = 0) : (diffTotal = Number(diff.toFixed(2)));

    switch (inputType) {
      case 'square':
        $('input[data-type=cubic]', item).val((Math.ceil(inputValue / squareFormula) * cubicFormula).toFixed(2).replace(/[,.]?0+$/, ''));
        $('input[data-type=running]', item).val((Math.ceil(inputValue / squareFormula) * length).toFixed(2).replace(/[,.]?0+$/, ''));
        $('input[data-type=pieces]', item).val(Math.ceil(inputValue / squareFormula));
        break;
      case 'cubic':
        $('input[data-type=square]', item).val((squareFormula.toFixed(2) * piecesFormula).toFixed(2).replace(/[,.]?0+$/, ''));
        $('input[data-type=running]', item).val(piecesFormula * length);
        $('input[data-type=pieces]', item).val(piecesFormula);
        break;
      case 'running':
        $('input[data-type=square]', item).val(
          (squareFormula.toFixed(2) * Math.ceil(runningFormula / cubicFormula)).toFixed(2).replace(/[,.]?0+$/, '')
        );
        $('input[data-type=cubic]', item).val(runningFormula.replace(/[,.]?0+$/, ''));
        $('input[data-type=pieces]', item).val(Math.ceil(runningFormula / cubicFormula));
        break;
      case 'pieces':
        $('input[data-type=square]', item).val((squareFormula.toFixed(2) * inputValue).toFixed(2).replace(/[,.]?0+$/, ''));
        $('input[data-type=cubic]', item).val((inputValue * cubicFormula).toFixed(2).replace(/[,.]?0+$/, ''));
        $('input[data-type=running]', item).val((inputValue * length).toFixed(2).replace(/[,.]?0+$/, ''));
        break;
    }

    $('.js-calc__total', item).text(triplets(price * $('input[data-type=pieces]', item).val()));

    if ($('input[data-type=pieces]', item).val() === '') {
      $(item).removeClass('focus');
      $('input[data-type=square]', item).val('');
      $('input[data-type=cubic]', item).val('');
      $('input[data-type=running]', item).val('');
      $('input[data-type=pieces]', item).val('');
    } else {
      $(item).addClass('focus');
    }
  });

  if ($(item).hasClass('js-default-value')) {
    const defaultCubicPieces = Math.ceil(1 / cubicFormula);
    const defaultCubicSquare = (squareFormula.toFixed(2) * Math.ceil(1 / cubicFormula)).toFixed(2).replace(/[,.]?0+$/, '');
    const defaultCubicRunnig = Math.ceil(1 / cubicFormula) * length;

    $('.default-cubic').text(`${defaultCubicPieces} шт. | ${defaultCubicSquare} м.кв. | ${defaultCubicRunnig} м.пог.`);

    const defaultPiecesCubic = cubicFormula.toFixed(2).replace(/[,.]?0+$/, '');
    const defaultPiecesSquare = squareFormula.toFixed(2).replace(/[,.]?0+$/, '');
    const defaultPiecesRunnig = length.toFixed(2).replace(/[,.]?0+$/, '');

    $('.default-pieces').text(`${defaultPiecesCubic} м.куб. | ${defaultPiecesSquare} м.кв. | ${defaultPiecesRunnig} м.пог.`);
  }
});
