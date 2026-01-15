import { load } from "cheerio";

export default function homeExtract(html) {
  const $ = load(html);

  const response = {
    home: [],
  };

  const $home = $("#slideee .film_list-wrap .film-list-ul");

  $($home).each((i, el) => {
    const data = $(el).find(".flw-item");
    const obj = {
      title: null,
      rank: null,
      poster: null,
    };
    const titleEl = $(el).find(".film-detail .film-name");
    obj.title = titleEl.text();

    obj.rank = i + 1;

    const imageEl = $(el).find(".film-poster");

    obj.poster = imageEl.find("img").attr("data-src");

    response.home.push(obj);
  });

  return response;
}
