module.exports = {
  urls: {
    sh: 'http://xueqiu.com/S/SH000001',
    sz: 'http://xueqiu.com/S/SZ399001',
    djx: 'http://xueqiu.com/S/.DJI',
    nasdaq: 'http://xueqiu.com/S/.IXIC',
    sp: 'http://xueqiu.com/S/.INX',
    hsi: 'http://xueqiu.com/S/HKHSI'
  },
  selectors: {
    xueqiu: {
      value: '.stock-current > strong',
      change: '.stock-change'
    }
  }
};
