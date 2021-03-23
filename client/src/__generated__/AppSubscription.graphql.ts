/* tslint:disable */
/* eslint-disable */
/* @relayHash 2d677911ae9e7208a80aa463b1b60217 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppSubscriptionVariables = {};
export type AppSubscriptionResponse = {
    readonly messageSent: {
        readonly " $fragmentRefs": FragmentRefs<"MessageList_messages">;
    };
};
export type AppSubscription = {
    readonly response: AppSubscriptionResponse;
    readonly variables: AppSubscriptionVariables;
};



/*
subscription AppSubscription {
  messageSent {
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
    "name": "AppSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "messageSent",
        "storageKey": null,
        "args": null,
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
    "name": "AppSubscription",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "messageSent",
        "storageKey": null,
        "args": null,
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
    "operationKind": "subscription",
    "name": "AppSubscription",
    "id": null,
    "text": "subscription AppSubscription {\n  messageSent {\n    ...MessageList_messages\n    id\n  }\n}\n\nfragment MessageList_messages on Message {\n  id\n  user\n  message\n}\n",
    "metadata": {}
  }
};
(node as any).hash = '06cc8a2fdda0ef448094f1500a8149d2';
export default node;
