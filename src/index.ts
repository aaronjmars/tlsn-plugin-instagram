import icon from '../assets/icon.png';
import config_json from '../config.json';
import { redirect, notarize, outputJSON, getCookiesByHost, getHeadersByHost } from './utils/hf.js';

/**
 * Plugin configuration
 * This configurations defines the plugin, most importantly:
 *  * the different steps
 *  * the user data (headers, cookies) it will access
 *  * the web requests it will query (or notarize)
 */
export function config() {
  outputJSON({
    ...config_json,
    icon: icon
  });
}

function isValidHost(urlString: string) {
  const url = new URL(urlString);
  return url.hostname === 'www.instagram.com' || url.hostname === 'instagram.com';
}

/**
 * Implementation of the first (start) plugin step
  */
export function start() {
  if (!isValidHost(Config.get('tabUrl'))) {
    redirect('https://www.instagram.com/accounts/edit/');
    outputJSON(false);
    return;
  }
  outputJSON(true);
}

/**
 * Implementation of step "two".
 * This step collects and validates authentication cookies and headers for 'instagram.com'.
 * If all required information, it creates the request object.
 * Note that the url needs to be specified in the `config` too, otherwise the request will be refused.
 */
export function two() {
  const cookies = getCookiesByHost('www.instagram.com');
  const headers = getHeadersByHost('www.instagram.com');
  
  if (
    !headers['X-IG-App-ID'] ||
    !cookies
  ) {
    outputJSON(false);
    return;
  }

  outputJSON({
    url: 'https://www.instagram.com/api/v1/accounts/edit/web_form_data/',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-IG-App-ID': headers['X-IG-App-ID'],
      Cookie: `mid=${cookies.mid}; ig_did=${cookies.ig_did}; csrftoken=${cookies.csrftoken}; ds_user_id=${cookies.ds_user_id}; dpr=${cookies.dpr}; datr=${cookies.datr}; shbid=${cookies.shbid}; shbts=${cookies.shbts}; wd=${cookies.wd}; sessionid=${cookies.sessionid}; rur=${cookies.rur}`,
      'Accept-Encoding': 'identity',
      Connection: 'close',
    },
    secretHeaders: [
      `X-IG-App-ID: ${headers['X-IG-App-ID']}`,
      `cookie: mid=${cookies.mid}; ig_did=${cookies.ig_did}; csrftoken=${cookies.csrftoken}; ds_user_id=${cookies.ds_user_id}; dpr=${cookies.dpr}; datr=${cookies.datr}; shbid=${cookies.shbid}; shbts=${cookies.shbts}; wd=${cookies.wd}; sessionid=${cookies.sessionid}; rur=${cookies.rur}`,
    ],
  });
}


/**
 * This method is used to parse the Twitter response and specify what information is revealed (i.e. **not** redacted)
 * This method is optional in the notarization request. When it is not specified nothing is redacted.
 *
 * In this example it locates the `screen_name` and excludes that range from the revealed response.
 */
export function parseInstagramResp() {
  const bodyString = Host.inputString();
  const params = JSON.parse(bodyString);

  if (params.form_data.username) {
    const revealed = `"username":"${params.form_data.username}"`;
    const selectionStart = bodyString.indexOf(revealed);
    const selectionEnd =
      selectionStart + revealed.length;
    const secretResps = [
      bodyString.substring(0, selectionStart),
      bodyString.substring(selectionEnd, bodyString.length),
    ];
    outputJSON(secretResps);
  } else {
    outputJSON(false);
  }
}

/**
 * Step 3: calls the `notarize` host function
 */
export function three() {
  const params = JSON.parse(Host.inputString());

  if (!params) {
    outputJSON(false);
  } else {
    const id = notarize({
      ...params,
      getSecretResponse: 'parseInstagramResp',
    });
    outputJSON(id);
  }
}
