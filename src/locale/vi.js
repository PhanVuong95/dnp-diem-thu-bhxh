import dayjs from 'dayjs';

const locale = {
  name: 'vi', // Tên locale
  weekdays: 'Chủ Nhật_Thứ Hai_Thứ Ba_Thứ Tư_Thứ Năm_Thứ Sáu_Thứ Bảy'.split('_'),
  months: 'Tháng Một_Tháng Hai_Tháng Ba_Tháng Tư_Tháng Năm_Tháng Sáu_Tháng Bảy_Tháng Tám_Tháng Chín_Tháng Mười_Tháng Mười Một_Tháng Mười Hai'.split('_'),
  weekStart: 1, // Tuần bắt đầu từ thứ Hai
  weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  monthsShort: 'Thg 1_Thg 2_Thg 3_Thg 4_Thg 5_Thg 6_Thg 7_Thg 8_Thg 9_Thg 10_Thg 11_Thg 12'.split('_'),
  weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  ordinal: (n) => `${n}`,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm',
  },
  relativeTime: {
    future: 'trong %s',
    past: '%s trước',
    s: 'vài giây',
    m: 'một phút',
    mm: '%d phút',
    h: 'một giờ',
    hh: '%d giờ',
    d: 'một ngày',
    dd: '%d ngày',
    M: 'một tháng',
    MM: '%d tháng',
    y: 'một năm',
    yy: '%d năm',
  },
};

// Cấu hình locale cho dayjs
dayjs.locale(locale, null, true);

export default locale;