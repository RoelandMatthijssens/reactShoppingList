FROM node

ENV ROOT=/data
ENV SRC_DIR=${ROOT}/src

WORKDIR ${SRC_DIR}
COPY . ${SRC_DIR}
RUN npm install

RUN set -xe \
    && mkdir -vp ${SRC_DIR}/db/

CMD []
ENTRYPOINT ["nodejs", "main"]

EXPOSE 8000
