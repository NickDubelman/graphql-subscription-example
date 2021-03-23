# GraphQL Subscription Example with Golang

A very simple chat room that uses React+Relay to make a subscription (via
websockets) to a GraphQL API. This app demonstrates a pattern that can be used to
allow Go backends to communicate with Javascript (namely React) frontends by simply
sending "events" to a Go channel.

## Basic Usage

1. Start backend with `cd server && go run server/server.go`
2. Start frontend with `cd client && yarn start`
3. Try opening 2 tabs, send messages in one tab and observe that they appear in the
   other tab without a page refresh
