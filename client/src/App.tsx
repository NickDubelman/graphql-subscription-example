import React, { useEffect } from 'react'
import graphql from 'babel-plugin-relay/macro'

import './App.css'
import QueryRenderer, { requestSubscription, addMessageToStore } from 'relay-env'
import { AppQuery } from '__generated__/AppQuery.graphql'
import MessageList from 'components/MessageList'
import SendMessage from 'components/SendMessage'
import { AppSubscription } from '__generated__/AppSubscription.graphql'

const App = () => {
  useEffect(requestMessageSubscription, [])

  return (
    <div>
      <QueryRenderer<AppQuery>
        query={appQuery}
        variables={{}}
        render={({ error, props }) => {
          if (error) return error.message
          if (!props) return 'Loading...'
          return (
            <div>
              <SendMessage />
              <MessageList messages={props.messages} />
            </div>
          )
        }}
      />
    </div>
  )
}

const appQuery = graphql`
  query AppQuery {
    messages {
      ...MessageList_messages
    }
  }
`

const messageSubscription = graphql`
  subscription AppSubscription {
    messageSent {
      ...MessageList_messages
    }
  }
`

const requestMessageSubscription = () => {
  requestSubscription<AppSubscription>({
    subscription:  messageSubscription,
    variables: {},
    updater: store => {
      const newMessage = store.getRootField('messageSent')
      if (!newMessage) return
      addMessageToStore(store, newMessage)
    }
  })
}

export default App
