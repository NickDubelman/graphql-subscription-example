import React from 'react'
import { createFragmentContainer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import { MessageList_messages } from '__generated__/MessageList_messages.graphql'

interface MessageListProps {
  messages: MessageList_messages
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div>
      {messages.map((message, id) => (
        <div key={id}>
          {message.user} - {message.message}
        </div>
      ))}
    </div>
  )
}

export default createFragmentContainer(MessageList, {
  messages: graphql`
    fragment MessageList_messages on Message @relay(plural: true) {
      id
      user
      message
    }
  `
})
