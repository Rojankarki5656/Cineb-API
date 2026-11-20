"""IMDB charts: Top 250s, MovieMeter/TVMeter, weekend box office, StarMeter.

Single-shot lists (no cursor params on the public endpoints — the whole
chart comes back in one call): top-movies / top-tv return the full 250,
popular-movies / popular-tv the top 100, popular-celebrities the top 100.

Every chart accepts an optional ``limit`` to fetch fewer than the full
chart. For the GraphQL-backed charts this is pushed down as ``first``;
for box-office (which has no ``first``) it is applied client-side.

Smoke test (plain HTTP, no chrome pools, ONLY_SCRAPER not required):

    python imdb/charts.py [chart] [limit]
    python imdb/charts.py top-movies
    python imdb/charts.py popular-movies 7
    python imdb/charts.py box-office 5
    python imdb/charts.py popular-celebrities
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from imdb import parsers, queries  # noqa: E402
from imdb import fetch  # noqa: E402  (module import so tests can monkeypatch)

TOP_CHART_SIZE = 250      # TOP_RATED_* charts are exactly 250 titles
POPULAR_CHART_SIZE = 100  # MovieMeter/TVMeter/StarMeter published depth

CHART_KINDS = sorted(queries.TITLE_CHARTS) + ["box-office", "popular-celebrities"]


def _parse_limit(limit, default, maximum):
    """Turn a user-supplied limit into an int in [1, maximum].

    ``None`` -> ``default``. Non-integers raise ``ValueError`` so the
    routes layer turns them into a 400. Values above ``maximum`` are
    clamped (requesting more than a chart has is not an error).
    """
    if limit is None or limit == "":
        return default
    try:
        n = int(limit)
    except (TypeError, ValueError):
        raise ValueError(f"limit must be an integer, got: {limit!r}")
    if n < 1:
        raise ValueError(f"limit must be >= 1, got: {n}")
    return min(n, maximum)


def get_title_chart(kind, country=None, limit=None):
    """One ranked title chart: top-movies, top-tv, popular-movies, popular-tv."""
    kind = (kind or "").strip().lower()
    if kind not in queries.TITLE_CHARTS:
        raise ValueError(
            f"chart must be one of {', '.join(sorted(queries.TITLE_CHARTS))}, got: {kind!r}")
    country = queries.normalize_country(country)

    cap = TOP_CHART_SIZE if kind.startswith("top-") else POPULAR_CHART_SIZE
    first = _parse_limit(limit, cap, cap)

    data = fetch.fetch_graphql(
        queries.CHART_TITLES,
        {"first": first, "chartType": queries.TITLE_CHARTS[kind]},
        country=country)
    results, pagination = parsers.parse_chart_titles(data)
    results = results[:first]  # defensive: don't trust upstream to honor `first`
    return {
        "chart": kind,
        "country": country,
        "count": len(results),
        "pagination": pagination,
        "results": results,
    }


def get_box_office(country=None, limit=None):
    """The weekend box office chart (US theatrical). No server-side limit."""
    country = queries.normalize_country(country)
    data = fetch.fetch_graphql(queries.BOX_OFFICE, {}, country=country)
    weekend, entries = parsers.parse_box_office(data)
    n = _parse_limit(limit, len(entries), max(len(entries), 1))
    entries = entries[:n]
    return {
        "chart": "box-office",
        "country": country,
        "weekend": weekend,
        "count": len(entries),
        "results": entries,
    }


def get_popular_celebrities(country=None, limit=None):
    """The StarMeter chart: the most popular people this week (max 100)."""
    country = queries.normalize_country(country)
    first = _parse_limit(limit, POPULAR_CHART_SIZE, POPULAR_CHART_SIZE)
    data = fetch.fetch_graphql(queries.POPULAR_CELEBRITIES,
                               {"first": first}, country=country)
    results, pagination = parsers.parse_chart_names(data)
    results = results[:first]
    return {
        "chart": "popular-celebrities",
        "country": country,
        "count": len(results),
        "pagination": pagination,
        "results": results,
    }


def get_chart(kind, country=None, limit=None):
    """Dispatch any chart kind (routes layer entry point)."""
    kind_clean = (kind or "").strip().lower()
    if kind_clean == "box-office":
        return get_box_office(country, limit=limit)
    if kind_clean == "popular-celebrities":
        return get_popular_celebrities(country, limit=limit)
    return get_title_chart(kind_clean, country, limit=limit)


if __name__ == "__main__":
    arg_kind = sys.argv[1] if len(sys.argv) > 1 else "top-movies"
    arg_limit = sys.argv[2] if len(sys.argv) > 2 else None
    out = get_chart(arg_kind, limit=arg_limit)
    print(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"chart={out['chart']} count={out['count']}", file=sys.stderr)