FROM node

ENV ROOT=/data
WORKDIR ${ROOT}

COPY package.json package-lock.json ${ROOT}/
RUN npm install
COPY src/ ${ROOT}/src

RUN set -xe \
    && mkdir -vp ${ROOT}/db/

CMD []
ENTRYPOINT ["npm", "run", "start"]

EXPOSE 8000
