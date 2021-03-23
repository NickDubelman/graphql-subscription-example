package models

import (
	"fmt"
	"sort"
	"strconv"
	"sync"
)

type MessageStore interface {
	GetAll() []Message
	GetByID(id string) (Message, error)
	Insert(input MessageInput) Message
}

type messageStoreMap struct {
	sync.Mutex
	Map map[string]Message
}

var nextID = 1

var Store = messageStoreMap{}

func (s messageStoreMap) GetAll() (messages []Message) {
	for _, message := range s.Map {
		messages = append(messages, message)
	}

	// Sort messages by ID
	sort.Slice(messages, func(a, b int) bool {
		idA, err := strconv.Atoi(messages[a].ID)
		if err != nil {
			return false
		}

		idB, err := strconv.Atoi(messages[b].ID)
		if err != nil {
			return false
		}

		return idA < idB
	})
	return
}

func (s messageStoreMap) GetByID(id string) (Message, error) {
	message, ok := s.Map[id]
	if !ok {
		return Message{}, fmt.Errorf("Could not find message with id %s", id)
	}
	return message, nil
}

func (s messageStoreMap) Insert(input MessageInput) Message {
	id := strconv.Itoa(nextID)

	message := Message{
		ID:      id,
		User:    input.User,
		Message: input.Message,
	}

	s.Lock()
	s.Map[id] = message // Add to map
	s.Unlock()
	nextID++ // Increment ID for next message

	return message
}
