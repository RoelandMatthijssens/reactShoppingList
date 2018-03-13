FROM node

ENV ROOT=/data
ENV SRC_DIR=${ROOT}

WORKDIR ${SRC_DIR}

COPY package.json package-lock.json ${SRC_DIR}/
RUN npm install
COPY src/ ${ROOT}/src

RUN set -xe \
    && mkdir -vp ${ROOT}/db/

CMD []
ENTRYPOINT ["npm", "run", "start"]

EXPOSE 8000
