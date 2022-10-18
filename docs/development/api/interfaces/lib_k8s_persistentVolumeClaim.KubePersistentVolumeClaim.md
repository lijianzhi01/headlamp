---
title: "Interface: KubePersistentVolumeClaim"
linkTitle: "KubePersistentVolumeClaim"
slug: "lib_k8s_persistentVolumeClaim.KubePersistentVolumeClaim"
---

[lib/k8s/persistentVolumeClaim](../modules/lib_k8s_persistentVolumeClaim.md).KubePersistentVolumeClaim

## Hierarchy

- [`KubeObjectInterface`](lib_k8s_cluster.KubeObjectInterface.md)

  ↳ **`KubePersistentVolumeClaim`**

## Properties

### apiVersion

• `Optional` **apiVersion**: `string`

#### Inherited from

[KubeObjectInterface](lib_k8s_cluster.KubeObjectInterface.md).[apiVersion](lib_k8s_cluster.KubeObjectInterface.md#apiversion)

#### Defined in

[lib/k8s/cluster.ts:23](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/cluster.ts#L23)

___

### kind

• **kind**: `string`

#### Inherited from

[KubeObjectInterface](lib_k8s_cluster.KubeObjectInterface.md).[kind](lib_k8s_cluster.KubeObjectInterface.md#kind)

#### Defined in

[lib/k8s/cluster.ts:22](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/cluster.ts#L22)

___

### metadata

• **metadata**: [`KubeMetadata`](lib_k8s_cluster.KubeMetadata.md)

#### Inherited from

[KubeObjectInterface](lib_k8s_cluster.KubeObjectInterface.md).[metadata](lib_k8s_cluster.KubeObjectInterface.md#metadata)

#### Defined in

[lib/k8s/cluster.ts:24](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/cluster.ts#L24)

___

### spec

• **spec**: `Object`

#### Index signature

▪ [other: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accessModes` | `string`[] |
| `resources` | { `limits`: `object` ; `requests`: { `[other: string]`: `any`; `storage?`: `string`  }  } |
| `resources.limits` | `object` |
| `resources.requests` | { `[other: string]`: `any`; `storage?`: `string`  } |
| `resources.requests.storage?` | `string` |
| `storageClassName` | `string` |
| `volumeMode` | `string` |
| `volumeName` | `string` |

#### Defined in

[lib/k8s/persistentVolumeClaim.ts:5](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/persistentVolumeClaim.ts#L5)

___

### status

• **status**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `capacity?` | { `storage?`: `string`  } |
| `capacity.storage?` | `string` |
| `phase` | `string` |

#### Defined in

[lib/k8s/persistentVolumeClaim.ts:19](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/persistentVolumeClaim.ts#L19)
