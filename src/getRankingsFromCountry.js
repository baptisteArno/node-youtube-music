import got from 'got';
import context from './context.js';
import parseRankingData from './parsers/parseRankingData.js';


export async function getRankingsFromCountry(
  countryIdIso = 'ZZ',
  options
) {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      json: {
        ...context.body,
        browseId: "FEmusic_charts",
        formData: {
          selectedValues: [countryIdIso]
        },
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          'Accept-Language': options?.lang ?? 'en',
          origin: 'https://music.youtube.com',
        },
      }
    }
  );
  try {
    const responde =  parseRankingData(JSON.parse(response.body));
    responde.isoCode = countryIdIso;
    return responde;
  } catch (e) {
    console.error(e);
    return {};
  }
}
