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
  },
});

const benefitSlider = new Swiper('.benefit-slider', {
  slidesPerView: 2,
  spaceBetween: 20,
  pagination: {
    el: '.benefit-count',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.benefit-next',
    prevEl: '.benefit-prev',
  },
});

const triplets = (str) => {
  return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u202f');
};

const tripletsString = document.querySelectorAll('.triplets');
tripletsString.forEach((string) => {
  string.innerHTML = triplets(string.innerHTML);
});

// const catalogItem = document.querySelectorAll('.catalog-item');
// catalogItem.forEach((item) => {
//   // wishlist
//   const wishlistIcon = item.querySelector('.catalog-item__wishlist');
//   wishlistIcon.addEventListener('click', (el) => el.target.classList.toggle('active'));

//   // form focus
//   const calc = item.querySelector('.catalog-item__calc');
//   calc.addEventListener('focus', () => item.classList.add('focus'), true);
//   calc.addEventListener('blur', () => item.classList.remove('focus'), true);
// });

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
