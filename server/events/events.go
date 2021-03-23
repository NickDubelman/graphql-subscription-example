package events

import "sync"

// Event describes an event that a client may want to subscribe to
type Event interface {
	isEvent()
}

// Observer represents someone that is subscribed to events
type Observer struct {
	OnEvent func(Event)
}

// ObserverList tracks all of the active subscriptions
type ObserverList struct {
	sync.Mutex
	Observers []Observer
}

// Publish sends an event to all the observers who care about the event
func (l *ObserverList) Publish(e Event) {
	for _, observer := range l.Observers {
		observer.OnEvent(e)
	}
}

// Subscribe simply adds an Observer to the observer list
func (l *ObserverList) Subscribe(obs Observer) {
	l.Lock()
	l.Observers = append(l.Observers, obs)
	l.Unlock()
}
