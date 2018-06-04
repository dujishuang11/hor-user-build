FROM 10.25.0.141:5000/library/httpd:2.4.29

MAINTAINER cuijx@neunn.com

RUN apt-get update && \
		rm -rf /usr/local/apache2/htdocs

COPY ./release/ /usr/local/apache2/htdocs/

EXPOSE 80
