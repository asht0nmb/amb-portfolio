#!/usr/bin/env bash
set -e

REPO_URL="https://github.com/xdesro/storygraph-api.git"
CLONE_DIR="storygraph-py"

# 1) Clone or update the repo
if [ ! -d "$CLONE_DIR" ]; then
  git clone "$REPO_URL" "$CLONE_DIR"
else
  pushd "$CLONE_DIR" >/dev/null
  git pull
  popd >/dev/null
fi

# 2) Enter the directory
cd "$CLONE_DIR"

# 3) Create (or activate) a Python virtualenv
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi
source venv/bin/activate

# 4) Install/update its dependencies
pip install --upgrade pip
pip install -r requirements.txt

# 5) Run the module or script
#    (replace `main.py` with whatever entrypoint the repo uses)
python main.py

# 6) Deactivate venv  
deactivate