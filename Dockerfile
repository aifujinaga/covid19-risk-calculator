FROM golang:1.18

RUN mkdir /src
WORKDIR /src

COPY . ./
RUN go build

EXPOSE 3000:3000

CMD ["./InfectionRisk"]
