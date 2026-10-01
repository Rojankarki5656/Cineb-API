"""IMDb Scraper API - Vercel entrypoint.

Vercel's Python runtime automatically serves the WSGI application
exposed as `app` in this file.
"""
import bottle

import config
import routes  # noqa: F401 - mounts routes on Bottle's default app

# Expose the WSGI application for Vercel.
# Vercel looks for a top-level variable named `app` in main.py.
app = bottle.default_app()