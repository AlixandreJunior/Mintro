set -o errexit

echo "Iniciando servidor WSGI com Gunicorn..."
gunicorn src.project.wsgi:application --bind 0.0.0.0:$PORT
