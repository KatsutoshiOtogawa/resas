// @ts-check

// import {Request, Response} from 'express'
/**
 * @typedef {Object} PrefData - prefectureのデータ
 * @property {number} prefCode - 県名コード
 * @property {string} prefName - 県名
 */


/**
* @typedef {Object} PrefectureJson - Prefectureのjson
 * @property {string} message - SpecialTypeの文字列プロパティ
 * @property {{prefCode: number; prefName: string;}[]} result - 県データ
 */

/**
 * Responds to any HTTP request.
 *
 * @param {!express.Request} req HTTP request context.
 * @param {!express.Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {

  /** @type {PrefectureJson} */
  let json;

  (async function() {
    const options = {
      method: 'GET',
      headers: { 
        'X-API-KEY': process.env.PREFECTURE_API_KEY
      },
    }
    const api_url = "https://opendata.resas-portal.go.jp/api/v1/prefectures"
    const response = await fetch(api_url, options);

    json = await response.json();

    if (response.status != 200) {
      console.error('fetch failed');
      res.status(400).json(json);
      return;
    }
    res.status(200).json(json);
  }());
};
