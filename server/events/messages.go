package events

import "gitlab.aristanetworks.com/ndubelman/graphql-subscription-example/server/models"

// MessageSent is an event describing a message being sent
type MessageSent struct {
	Message models.Message
}

func (e MessageSent) isEvent() {}
