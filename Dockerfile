FROM node:14-slim

COPY . .

RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  python3.5 \
  python3-pip \
  && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

RUN npm install

CMD ["npm", "start"]