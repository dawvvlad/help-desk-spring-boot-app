FROM ubuntu:latest
LABEL authors="vladdrd"

ENTRYPOINT ["top", "-b"]