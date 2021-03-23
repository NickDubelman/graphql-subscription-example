/* tslint:disable */
/* eslint-disable */
/* @relayHash d767bd16c84757598feddd5ec1d8c582 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MessageInput = {
    user: string;
    message: string;
};
export type SendMessageMutationVariables = {
    input: MessageInput;
};
export type SendMessageMutationResponse = {
    readonly sendMessage: {
        readonly " $fragmentRefs": FragmentRefs<"MessageList_messages">;
    };
};
export type SendMessageMutation = {
    readonly response: SendMessageMutationResponse;
    readonly variables: SendMessageMutationVariables;
};



/*
mutation SendMessageMutation(
  $input: MessageInput!
) {
  sendMessage(input: $input) {
    ...MessageList_messages
    id
  }
}

fragment MessageList_messages on Message {
  id
  user
  message
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "MessageInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SendMessageMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sendMessage",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Message",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "MessageList_messages",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SendMessageMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sendMessage",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Message",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "user",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "message",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "SendMessageMutation",
    "id": null,
    "text": "mutation SendMessageMutation(\n  $input: MessageInput!\n) {\n  sendMessage(input: $input) {\n    ...MessageList_messages\n    id\n  }\n}\n\nfragment MessageList_messages on Message {\n  id\n  user\n  message\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f971c20f18ae865dbdfa0b5f81730025';
export default node;
