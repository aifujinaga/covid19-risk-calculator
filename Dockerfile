FROM golang:1.18

RUN mkdir /src
WORKDIR /src

COPY . ./
RUN go build

EXPOSE 8080

CMD ["./InfectionRisk"]
