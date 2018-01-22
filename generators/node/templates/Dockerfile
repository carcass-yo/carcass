FROM node:6-stretch

# process manager
RUN npm install -g pm2

# less for bunyan
RUN apt-get update \
	&& apt-get install -y less
	&& rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/node/www
WORKDIR /home/node/www

COPY sbin/ /usr/local/sbin/
RUN chown node.node /usr/local/sbin/custom-entrypoint && chmod +x /usr/local/sbin/custom-entrypoint
CMD custom-entrypoint

ENV LANG С.UTF-8
