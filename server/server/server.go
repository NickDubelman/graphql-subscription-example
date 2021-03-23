package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/handler"
	"github.com/gorilla/websocket"

	"gitlab.aristanetworks.com/ndubelman/graphql-subscription-example/server"
	"gitlab.aristanetworks.com/ndubelman/graphql-subscription-example/server/events"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	http.Handle("/", handler.Playground("GraphQL playground", "/query"))
	http.Handle("/query",
		ObserverMiddleware(
			handler.GraphQL(
				server.NewExecutableSchema(
					server.Config{Resolvers: &server.Resolver{}},
				),
				handler.WebsocketKeepAliveDuration(10*time.Second),
				handler.WebsocketUpgrader(websocket.Upgrader{
					CheckOrigin: func(r *http.Request) bool {
						return true
					},
				}),
			),
		),
	)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// ObserverMiddleware passes an observer list through context, which can be used for
// managing current subscriptions
func ObserverMiddleware(next http.Handler) http.Handler {
	observers := &events.ObserverList{}
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), server.ObserverKey, observers)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
