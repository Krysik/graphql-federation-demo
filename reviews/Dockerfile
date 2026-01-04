FROM golang:1.24.11-bookworm AS build
WORKDIR /app

RUN useradd -u 1001 -m gousr
COPY go.mod go.sum ./

RUN go mod download
COPY . .


RUN CGO_ENABLED=0 go build -o /app/reviews

FROM scratch

WORKDIR /app
COPY --from=build /app/reviews .
COPY --from=build /etc/passwd /etc/passwd

USER 1001

EXPOSE 5002
ENTRYPOINT [ "/app/reviews" ]

