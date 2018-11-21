const { getStockIndexData } = require('./scripts/stock');

const cheerio = require('./modules/cheerio');

// const result = await getStockIndexData();
// console.log(result);

getFinanceData();

const data = [];

const supportedNames = [
  '上海综合',
  '香港恒生',
  '日经225',
  // '英国股市',
  '道琼工业',
  'NASDAQ',
  // '美元欧元',
  '美元人民币',
  // '英镑欧元',
  '英镑人民币',
  '欧元人民币'
];

async function getFinanceData() {
  const res = await $http.get({
    url:
      'https://api.money.126.net/data/feed/FG_sh_zh,FG_hk_hengsheng,FG_rj225,FG_xinjiapo,FG_yingguo,FG_deguo,FG_faguo,FG_eluosi,FG_dqs,FG_nasdaq,FG_sp500,FG_baxi,FG_huangjin,FG_huangjinqihuo,FG_blt_yuanyou,FG_ny_qingyuanyou,FX_USDEUR,FX_USDJPY,FX_USDAUD,FX_USDCNY,FX_HOTRANK,FX_EURUSD,FX_USDHKD,FX_GBPUSD,FG_meiyuanzhishu,FG_ouyuanzhishu,FG_yingbangzhishu,FG_riyuanzhishu,FG_aobizhishu,FX_CURRENCY_RATES,FG_yin,FG_bojin,FG_tong,FG_ba,FG_nie,FG_lv,FG_xin,FG_qian,FG_you,FG_yinqihuo,FG_tongqihuo,FX_USDGBP,FX_USDCHF,FX_USDCAD,FX_USDSGD,FX_USDNZD,FX_ECONOMIC_INDICATES,FX_CNYUSD,FX_CNYJPY,FX_CNYEUR,FX_CNYGBP,FX_CNYCHF,FX_CNYAUD,FX_CNYCAD,FX_CNYHKD,FX_CNYSGD,FX_CNYNZD,FX_JPYUSD,FX_JPYCNY,FX_JPYEUR,FX_JPYGBP,FX_JPYCHF,FX_JPYAUD,FX_JPYCAD,FX_JPYHKD,FX_JPYSGD,FX_JPYNZD,FX_EURCNY,FX_EURJPY,FX_EURGBP,FX_EURCHF,FX_EURAUD,FX_EURCAD,FX_EURHKD,FX_EURSGD,FX_EURNZD,FX_GBPCNY,FX_GBPJPY,FX_GBPEUR,FX_GBPCHF,FX_GBPAUD,FX_GBPCAD,FX_GBPHKD,FX_GBPSGD,FX_GBPNZD,FX_CHFUSD,FX_CHFCNY,FX_CHFJPY,FX_CHFEUR,FX_CHFGBP,FX_CHFAUD,FX_CHFCAD,FX_CHFHKD,FX_CHFSGD,FX_CHFNZD,FX_AUDUSD,FX_AUDCNY,FX_AUDJPY,FX_AUDEUR,FX_AUDGBP,FX_AUDCHF,FX_AUDCAD,FX_AUDHKD,FX_AUDSGD,FX_AUDNZD,FX_CADUSD,FX_CADCNY,FX_CADJPY,FX_CADEUR,FX_CADGBP,FX_CADCHF,FX_CADAUD,FX_CADHKD,FX_CADSGD,FX_CADNZD,FX_HKDUSD,FX_HKDCNY,FX_HKDJPY,FX_HKDEUR,FX_HKDGBP,FX_HKDCHF,FX_HKDAUD,FX_HKDCAD,FX_HKDSGD,FX_HKDNZD,FX_SGDUSD,FX_SGDCNY,FX_SGDJPY,FX_SGDEUR,FX_SGDGBP,FX_SGDCHF,FX_SGDAUD,FX_SGDCAD,FX_SGDHKD,FX_SGDNZD,FX_NZDUSD,FX_NZDCNY,FX_NZDJPY,FX_NZDEUR,FX_NZDGBP,FX_NZDCHF,FX_NZDAUD,FX_NZDCAD,FX_NZDHKD,FX_NZDSGD,money.api'
  });
  const jsonPString = res.data;
  const jsonString = jsonPString
    .replace(/_ntes_quote_callback\(/, '')
    .replace(/\);$/, '');
  const jsonData = JSON.parse(jsonString);

  // console.log(jsonData);

  for (const k in jsonData) {
    if (supportedNames.indexOf(jsonData[k].name) > -1) {
      data.push(jsonData[k]);
    }
  }
  console.log(data);

  const uiData = data.map(d => {
    const delta =
      typeof d.percent === 'number'
        ? d.percent * 100
        : Number(d.percent.replace('%', ''));
    const color = delta >= 0 ? $color('#417505') : $color('#D0021B');
    let name = d.name;
    if (name === '英镑人民币') {
      name = '💷' + name;
    } else if (name === '美元人民币') {
      name = '💵' + name;
    } else if (name == '欧元人民币') {
      name = '💶' + name;
    }

    return {
      type: 'label',
      props: {
        textColor: color,
        // editable: false,
        text: `  ${name}: ${d.price} (${delta.toFixed(2)}%)`
      },
      layout: $layout.fill
    };
  });

  console.log(uiData);

  $ui.render({
    views: [
      {
        type: 'list',
        props: { data: uiData },
        layout: $layout.fill
      }
    ]
  });
}
