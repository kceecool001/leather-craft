# Leather Craft Ventures Website - Docker Deployment

## Build Docker Image

```bash
docker build -t leather-craft-website .
```

## Run Container

```bash
docker run -d -p 8080:80 --name leather-craft leather-craft-website
```

## Access Website

Open browser: http://localhost:8080

## Stop Container

```bash
docker stop leather-craft
```

## Remove Container

```bash
docker rm leather-craft
```
