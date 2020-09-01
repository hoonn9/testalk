FROM    node:12

WORKDIR /usr/src/app

COPY    ./dist ./dist
COPY    package*.json ./
COPY    ./ecosystem.config.js ./
COPY    testalk-2b9dc-firebase-adminsdk-icfhw-1122c70469.json ./

RUN     yarn install
RUN     yarn global add pm2

EXPOSE  4000

CMD     ["pm2-runtime", "start", "ecosystem.config.js"]
