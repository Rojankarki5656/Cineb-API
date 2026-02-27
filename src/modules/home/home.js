import { load } from "cheerio";

export default function homeExtract(html) {
  const $ = load(html);

  const response = {
    featured: [],
    trendingMovies: [],
    trendingTV: [],
    latestMovies: [],
    latestTV: [],
    topImdb: []
  };

  // Extract Featured section (the slider)
  $("#slideee .film_list-wrap .film-list-ul .flw-item").each((i, el) => {
    const obj = extractMovieData($, el);
    response.featured.push(obj);
  });

  // Extract Trending Movies
  $("#trending-movies .flw-item").each((i, el) => {
    const obj = extractMovieData($, el);
    response.trendingMovies.push(obj);
  });

  // Extract Trending TV Shows
  $("#trending-tv .flw-item").each((i, el) => {
    const obj = extractTVData($, el);
    response.trendingTV.push(obj);
  });

  // Extract Latest Movies
  $(".section-id-02 .flw-item").each((i, el) => {
    const obj = extractMovieData($, el);
    response.latestMovies.push(obj);
  });

  // Extract Latest TV Shows
  $(".section-id-03 .flw-item").each((i, el) => {
    const obj = extractTVData($, el);
    response.latestTV.push(obj);
  });

  // Extract Top IMDB Rating
  $(".film_list-imdb .flw-item").each((i, el) => {
    const obj = extractImdbData($, el);
    response.topImdb.push(obj);
  });

  return response;
}

function extractMovieData($, element) {
  const obj = {
    title: null,
    year: null,
    duration: null,
    quality: null,
    poster: null,
    url: null
  };

  // Get title
  const titleEl = $(element).find(".film-name a");
  obj.title = titleEl.text().trim();
  obj.url = titleEl.attr("href");

  // Get poster
  const img = $(element).find(".film-poster-img");
  obj.poster = img.attr("data-src") || img.attr("src");

  // Get quality
  obj.quality = $(element).find(".fdi-type").text().trim();

  // Get year and duration from the fd-infor spans
  const infoSpans = $(element).find(".fd-infor .fdi-item");
  if (infoSpans.length >= 2) {
    obj.year = $(infoSpans[0]).text().trim();
    obj.duration = $(infoSpans[1]).text().trim();
  }

  return obj;
}

function extractTVData($, element) {
  const obj = {
    title: null,
    season: null,
    episode: null,
    quality: null,
    poster: null,
    url: null
  };

  // Get title
  const titleEl = $(element).find(".film-name a");
  obj.title = titleEl.text().trim();
  obj.url = titleEl.attr("href");

  // Get poster
  const img = $(element).find(".film-poster-img");
  obj.poster = img.attr("data-src") || img.attr("src");

  // Get quality
  obj.quality = $(element).find(".fdi-type").text().trim();

  // Get season and episode
  const infoSpans = $(element).find(".fd-infor .fdi-item");
  if (infoSpans.length >= 2) {
    obj.season = $(infoSpans[0]).text().trim();
    obj.episode = $(infoSpans[1]).text().trim();
  }

  return obj;
}

function extractImdbData($, element) {
  const obj = {
    title: null,
    imdbRating: null,
    type: null, // 'movie' or 'tv'
    poster: null,
    url: null
  };

  // Get title
  const titleEl = $(element).find(".film-name a");
  obj.title = titleEl.text().trim();
  obj.url = titleEl.attr("href");

  // Determine if it's a movie or TV show
  obj.type = obj.url.includes("/tv/") ? "tv" : "movie";

  // Get poster
  const img = $(element).find(".film-poster-img");
  obj.poster = img.attr("data-src") || img.attr("src");

  // Get IMDB rating
  const imdbEl = $(element).find(".imdb-score strong");
  if (imdbEl.length) {
    const ratingText = imdbEl.text().trim();
    obj.imdbRating = ratingText.replace("IMDB:", "").trim();
  }

  // Get additional info (for movies: year/duration, for TV: season/episode)
  const infoSpans = $(element).find(".fd-infor .fdi-item");
  if (infoSpans.length >= 2) {
    if (obj.type === "movie") {
      obj.year = $(infoSpans[0]).text().trim();
      obj.duration = $(infoSpans[1]).text().trim();
    } else {
      obj.season = $(infoSpans[0]).text().trim();
      obj.episode = $(infoSpans[1]).text().trim();
    }
  }

  return obj;
}