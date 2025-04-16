FROM ubuntu:22.04
WORKDIR /home
## Configure Time Zone
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=America\Mexico_City

## Update SO and dependencies
# review package actual version https://packages.ubuntu.com/

# for package ffmpeg libsm6 libxext6 reference https://stackoverflow.com/questions/55313610/importerror-libgl-so-1-cannot-open-shared-object-file-no-such-file-or-directo
RUN apt-get -y update && apt-get install -y --no-install-recommends tzdata unzip curl nano wget iputils-ping telnet git build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

## install node https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04 
### fix failed cert https://askubuntu.com/questions/1390288/curl-77-error-setting-certificate-verify-locations-ubuntu-20-04-3-lts
RUN apt-get -y update
RUN rm -f /etc/ssl/certs/ca-bundle.crt
RUN apt reinstall -y ca-certificates
RUN update-ca-certificates
RUN curl -sL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt install -y nodejs


## Copy code
COPY . ./app
WORKDIR /home/app
RUN npm i

## for realtime test local changes files
RUN mkdir /home/realtime

EXPOSE 3000
#CMD tail -f /dev/null
#CMD npm run dev