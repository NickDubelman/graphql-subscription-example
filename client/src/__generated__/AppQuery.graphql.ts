/* tslint:disable */
/* eslint-disable */
/* @relayHash b1cf7f75a3d2c8ee0204f95439258236 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppQueryVariables = {};
export type AppQueryResponse = {
    readonly messages: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"MessageList_messages">;
    }>;
};
export type AppQuery = {
    readonly response: AppQueryResponse;
    readonly variables: AppQueryVariables;
};



/*
query AppQuery {
  messages {
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

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "messages",
        "storageKey": null,
        "args": null,
        "concreteType": "Message",
        "plural": true,
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
    "name": "AppQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "messages",
        "storageKey": null,
        "args": null,
        "concreteType": "Message",
        "plural": true,
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
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery {\n  messages {\n    ...MessageList_messages\n    id\n  }\n}\n\nfragment MessageList_messages on Message {\n  id\n  user\n  message\n}\n",
    "metadata": {}
  }
};
(node as any).hash = '6fc93c4a58038443b4e5f13fb8288ae3';
export default node;
