---
title: "Interface: ContainerState"
linkTitle: "ContainerState"
slug: "lib_k8s_cluster.ContainerState"
---

[lib/k8s/cluster](../modules/lib_k8s_cluster.md).ContainerState

## Properties

### running

• **running**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `startedAt` | `string` |

#### Defined in

[lib/k8s/cluster.ts:644](https://github.com/headlamp-k8s/headlamp/blob/a8b3c4c6/frontend/src/lib/k8s/cluster.ts#L644)

___

### terminated

• **terminated**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `containerID` | `string` |
| `exitCode` | `number` |
| `finishedAt` | `string` |
| `message?` | `string` |
| `reason` | `string` |
| `signal?` | `number` |
| `startedAt` | `string` |

#### Defined in

[lib/k8s/cluster.ts:647](https://github.com/headlamp-k8s/headlamp/blob/a8b3c4c6/frontend/src/lib/k8s/cluster.ts#L647)

___

### waiting

• **waiting**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `message?` | `string` |
| `reason` | `string` |

#### Defined in

[lib/k8s/cluster.ts:656](https://github.com/headlamp-k8s/headlamp/blob/a8b3c4c6/frontend/src/lib/k8s/cluster.ts#L656)
