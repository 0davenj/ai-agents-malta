#!/bin/sh

# Replace environment variables in the built JS files
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|VITE_WEBHOOK_URL=.*|VITE_WEBHOOK_URL=${VITE_WEBHOOK_URL}|g" {} \;

# Start nginx
exec "$@"
