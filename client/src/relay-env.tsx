import React from 'react'
import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  OperationType,
  GraphQLTaggedNode,
  MutationConfig,
  commitMutation,
  MutationParameters,
  GraphQLSubscriptionConfig,
  requestSubscription as relayRequestSubscription,
  RequestParameters,
  Variables,
  RecordProxy,
  RecordSourceSelectorProxy
} from 'relay-runtime'
import { QueryRenderer } from 'react-relay'
import { execute } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const fetchQuery: FetchFunction = (operation, variables) => {
  return fetch('/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json()
  })
}

const subscriptionClient = new SubscriptionClient('ws://localhost:8080/query', {
  reconnect: true
})

const subscriptionLink = new WebSocketLink(subscriptionClient)

const subscribeFn: (
  operation: RequestParameters,
  variables: Variables
) => any = (operation, variables) =>
  execute(subscriptionLink, {
    // @ts-ignore
    query: operation.text,
    variables
  })

const environment = new Environment({
  network: Network.create(fetchQuery, subscribeFn),
  store: new Store(new RecordSource())
})

interface QueryRendererProps<T extends OperationType> {
  query: GraphQLTaggedNode | null | undefined
  render: (renderProps: {
    error: Error | null
    props: T['response'] | null
    retry: (() => void) | null
  }) => React.ReactNode
  variables: T['variables']
}

// OurQueryRenderer just returns a Relay QueryRenderer that is attached to our Relay
// environment so that we don't have to always explicitly pass it
const OurQueryRenderer = function<T extends OperationType>({
  query,
  render,
  variables
}: QueryRendererProps<T>) {
  return (
    <QueryRenderer<T>
      environment={environment}
      query={query}
      render={render}
      variables={variables}
    />
  )
}

export const mutate: <T extends MutationParameters>(
  config: MutationConfig<T>
) => Promise<T['response']> = config => {
  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      onError: reject,
      onCompleted: (data, errors) => {
        if (errors) {
          // if there are errors
          return reject(errors)
        }

        // There were no errors so resolve the promise
        resolve(data)
      },
      ...config
    })
  })
}

// requestSubscription just calls Relay's requestSubscription but passes our Relay
// environment
export const requestSubscription = function<T>(
  config: GraphQLSubscriptionConfig<T>
) {
  relayRequestSubscription(environment, { ...config })
}

export const addMessageToStore = function<T>(
  store: RecordSourceSelectorProxy<T>,
  newMessage: RecordProxy<{}>
) {
  const root = store.getRoot()
  const messages = root.getLinkedRecords('messages')
  if (!messages) return

  // Check to make sure message hasn't already been added
  for (let message of messages) {
    const id = message.getDataID()
    const newMessageID = newMessage.getDataID()
    if (id === newMessageID) return
  }

  root.setLinkedRecords([...messages, newMessage], 'messages')
}

export default OurQueryRenderer
