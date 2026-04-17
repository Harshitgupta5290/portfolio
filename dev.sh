#!/bin/bash

# Kill anything already on port 3000
PID=$(lsof -ti :3000)
if [ -n "$PID" ]; then
  echo "Killing existing process on port 3000 (PID: $PID)..."
  kill -9 $PID
  sleep 0.5
fi

# Start dev server
cd "$(dirname "$0")"
npm run dev
