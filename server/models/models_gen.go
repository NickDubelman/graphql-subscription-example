// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package models

type Message struct {
	ID      string `json:"id"`
	User    string `json:"user"`
	Message string `json:"message"`
}

type MessageInput struct {
	User    string `json:"user"`
	Message string `json:"message"`
}
