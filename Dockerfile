FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js
COPY questions.json /usr/share/nginx/html/questions.json
COPY sample-result-format.csv /usr/share/nginx/html/sample-result-format.csv
COPY assets /usr/share/nginx/html/assets

EXPOSE 80
