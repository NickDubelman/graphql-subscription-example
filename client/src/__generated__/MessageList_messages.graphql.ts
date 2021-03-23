/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MessageList_messages = ReadonlyArray<{
    readonly id: string;
    readonly user: string;
    readonly message: string;
    readonly " $refType": "MessageList_messages";
}>;
export type MessageList_messages$data = MessageList_messages;
export type MessageList_messages$key = ReadonlyArray<{
    readonly " $data"?: MessageList_messages$data;
    readonly " $fragmentRefs": FragmentRefs<"MessageList_messages">;
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "MessageList_messages",
  "type": "Message",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
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
};
(node as any).hash = '4c4b9710e3d8223a01f247fcac625b22';
export default node;
