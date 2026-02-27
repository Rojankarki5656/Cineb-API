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