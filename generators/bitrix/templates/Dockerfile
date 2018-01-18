FROM zolotoykod/bxweb:latest

COPY sbin/ /usr/local/sbin/
RUN chmod +x /usr/local/sbin/custom-entrypoint
CMD custom-entrypoint; sleep infinity

# enable ssmtp
#RUN mv /etc/php/7.1/fpm/conf.d/30-mail.ini.disabled /etc/php/7.1/fpm/conf.d/30-mail.ini &&
#	mv /etc/php/7.1/cli/conf.d/30-mail.ini.disabled /etc/php/7.1/cli/conf.d/30-mail.ini

# ssmtp config
#RUN { \
#	echo "mailhub=mail.zolotoykod.ru"; \
#	echo "FromLineOverride=YES"; \
#} >> /etc/ssmtp/ssmtp.conf

# default sender email
#RUN { \
#	echo "root:noreply@zolotoykod.ru:mail.zolotoykod.ru"; \
#	echo "www-data:noreply@zolotoykod.ru:mail.zolotoykod.ru"; \
#} >> /etc/ssmtp/revaliases
