FROM keymetrics/pm2:10-alpine as builder

RUN apk add git python make g++

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build:prod

FROM keymetrics/pm2:10-alpine

COPY --from=builder . .

# Bash install
# RUN apk add --no-cache bash

CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]