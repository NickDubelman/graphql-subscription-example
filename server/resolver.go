package server

import (
	"context"
	"fmt"

	"gitlab.aristanetworks.com/ndubelman/graphql-subscription-example/server/events"
	"gitlab.aristanetworks.com/ndubelman/graphql-subscription-example/server/models"
)

var ObserverKey = "observer"

// Resolver contains our implemented GraphQL resolvers
type Resolver struct{}

// Mutation resolver
func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}

// Query resolver
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

// Subscription resolver
func (r *Resolver) Subscription() SubscriptionResolver {
	return &subscriptionResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) SendMessage(
	ctx context.Context,
	input models.MessageInput,
) (*models.Message, error) {
	message := models.Store.Insert(input)

	observerList, err := getObserverList(ctx)
	if err != nil {
		return nil, err
	}

	observerList.Publish(events.MessageSent{Message: message})

	return &message, nil
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Messages(
	ctx context.Context,
) (ret []*models.Message, err error) {
	messages := models.Store.GetAll()
	for _, m := range messages {
		message := m
		ret = append(ret, &message)
	}
	return
}

type subscriptionResolver struct{ *Resolver }

func (r *subscriptionResolver) MessageSent(
	ctx context.Context,
) (<-chan *models.Message, error) {
	observerList, err := getObserverList(ctx)
	if err != nil {
		return nil, err
	}

	subscription := make(chan *models.Message, 1)
	go func() {
		<-ctx.Done()
	}()

	observerList.Subscribe(events.Observer{
		OnEvent: func(e events.Event) {
			if e, ok := e.(events.MessageSent); ok {
				subscription <- &e.Message
			}
		},
	})

	return subscription, nil

}

func getObserverList(ctx context.Context) (*events.ObserverList, error) {
	if m, ok := ctx.Value(ObserverKey).(*events.ObserverList); ok {
		return m, nil
	}
	return nil, fmt.Errorf("Unexpected error")
}
