FROM docker.io/library/nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html

COPY website/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
