import React, { useState } from 'react'
import graphql from 'babel-plugin-relay/macro'

import { mutate, addMessageToStore } from 'relay-env'
import { SendMessageMutation } from '__generated__/SendMessageMutation.graphql'

const SendMessage = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await mutate<SendMessageMutation>({
        mutation: sendMessageMutation,
        variables: {
          input: { user: name, message }
        },
        updater: store => {
          const newMessage = store.getRootField('sendMessage')
          addMessageToStore(store, newMessage)
        }
      })
    } catch (e) {
      alert(e)
      return
    }
    setMessage('') // reset message (but keep user)
  }

  return (
    <form style={{ display: 'flex' }} onSubmit={onSubmit}>
      <input
        placeholder="name"
        style={{ width: 124 }}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="message"
        style={{ flexGrow: 1 }}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send Message</button>
    </form>
  )
}

const sendMessageMutation = graphql`
  mutation SendMessageMutation($input: MessageInput!) {
    sendMessage(input: $input) {
      ...MessageList_messages
    }
  }
`

export default SendMessage
