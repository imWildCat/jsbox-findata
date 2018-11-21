const cheerio = require('../modules/cheerio');
const values = require('./values');
const { urls } = values;
const { xueqiu } = values.selectors;

async function getStockIndexData() {
  const result = {};
  for (let k in urls) {
    const url = urls[k];
    const res = await $http.get({ url: url });
    const doc = cheerio.load(res.data);
    const row = {};
    for (let item in xueqiu) {
      const v = doc(xueqiu[item]).text();
      row[item] = v;
      if (item === 'change') {
        const vals = v.split('  '); // two spaces
        row.valueChange = vals[0];
        row.rateChange = vals[1];
      }
    }
    result[k] = row;
  }
  return result;
}
exports.getStockIndexData = getStockIndexData;