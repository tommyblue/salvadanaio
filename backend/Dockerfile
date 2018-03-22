FROM elixir:latest

RUN apt-get update \
    && apt-get install --no-install-recommends --yes postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /root/.cache

RUN mkdir /app
RUN mix local.hex --force && mix local.rebar --force
COPY . /app
WORKDIR /app

RUN mix deps.get

RUN mix do compile

CMD ["/app/entrypoint.sh"]
