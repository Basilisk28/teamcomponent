FROM webmd-docker-local.artifactory.internetbrands.com/consumer/vuebuilder:latest as builder

WORKDIR /app

COPY . ./

RUN npm set registry https://artifactory.internetbrands.com/artifactory/api/npm/webmd-npm-virtual && \
    echo "Latest version of Generator available in artifactory is" && \
    npm info generator-webmd-vue version && \
    echo "Generator version in your vuebuilder:latest is" && \
    cd node_modules/generator-webmd-vue && node -p "require('./package.json').version" && cd .. && cd .. && \
    echo "Please make sure the above mentioned versions and the version below during replacement process matches" && \
    ./node_modules/.bin/webmd-vue-update && \
    npm cache verify && \
    npm i --only=production --registry=https://artifactory.internetbrands.com/artifactory/api/npm/webmd-npm-virtual --no-optional

ARG APPID
ARG DOCKERBUILD
ARG NPM_REGISTRY
ARG BASE_IMAGE
ARG REPOPATH
ARG BRANCH
ARG VERSION
ARG IMAGE_TAG
ARG IMAGE_NAME
ARG USERID

RUN node getVersions.js appid $APPID dockerbuild $DOCKERBUILD registry $NPM_REGISTRY base_image $BASE_IMAGE repo_path $REPOPATH branch $BRANCH pipeline_number $VERSION image_tag $IMAGE_TAG image_name $IMAGE_NAME built_by $USERID

RUN npm run build

FROM webmd-docker-local.artifactory.internetbrands.com/consumer/vueserver:latest as server

WORKDIR /app

COPY --from=builder  /app/dist  /app/dist

COPY --from=builder   /app/kubeconfig.json /app

COPY --from=builder   /app/versions.json /app

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
