FROM node:6-stretch

# process manager
RUN npm install -g pm2

# less for bunyan
RUN apt-get update \
	&& apt-get install -y less
	&& rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/node/www
WORKDIR /home/node/www

COPY ./entrypoint.sh /
RUN chown node.node /entrypoint.sh && chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

ENV LANG С.UTF-8
