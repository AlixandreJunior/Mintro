set -o errexit

if ! command -v uv &> /dev/null; then
    echo "Instalando uv (Astral)..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.local/bin:$PATH"
fi

echo "Instalando dependências..."
uv sync

echo "Rodando migrations..."
uv run src/manage.py migrate


echo "Coletando arquivos estáticos..."
uv run src/manage.py collectstatic --no-input

echo "Build concluído!"
