#!/usr/bin/env bash
set -o errexit

echo "Iniciando servidor WSGI com Gunicorn..."
uv run gunicorn src.project.wsgi:application --bind 0.0.0.0:$PORT
