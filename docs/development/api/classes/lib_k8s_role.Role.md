---
title: "Class: Role"
linkTitle: "Role"
slug: "lib_k8s_role.Role"
---

[lib/k8s/role](../modules/lib_k8s_role.md).Role

## Hierarchy

- `any`

  ↳ **`Role`**

  ↳↳ [`ClusterRole`](lib_k8s_clusterRole.ClusterRole.md)

## Constructors

### constructor

• **new Role**(`json`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`KubeRole`](../interfaces/lib_k8s_role.KubeRole.md) |

#### Inherited from

makeKubeObject<KubeRole\>('role').constructor

#### Defined in

[lib/k8s/cluster.ts:76](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/cluster.ts#L76)

## Properties

### apiEndpoint

▪ `Static` **apiEndpoint**: `Object`

#### Index signature

▪ [other: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `scale?` | { `get`: (`namespace`: `string`, `name`: `string`) => `Promise`<`any`\> ; `put`: (`body`: { `metadata`: [`KubeMetadata`](../interfaces/lib_k8s_cluster.KubeMetadata.md) ; `spec`: { `replicas`: `number`  }  }) => `Promise`<`any`\>  } |
| `scale.get` | (`namespace`: `string`, `name`: `string`) => `Promise`<`any`\> |
| `scale.put` | (`body`: { `metadata`: [`KubeMetadata`](../interfaces/lib_k8s_cluster.KubeMetadata.md) ; `spec`: { `replicas`: `number`  }  }) => `Promise`<`any`\> |

#### Defined in

[lib/k8s/role.ts:15](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/role.ts#L15)

___

### className

▪ `Static` **className**: `string`

#### Inherited from

makeKubeObject<KubeRole\>('role').className

#### Defined in

[lib/k8s/cluster.ts:77](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/cluster.ts#L77)

## Accessors

### rules

• `get` **rules**(): `any`

#### Returns

`any`

#### Defined in

[lib/k8s/role.ts:17](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/role.ts#L17)

## Methods

### apiList

▸ `Static` **apiList**(`onList`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onList` | (`arg`: `any`[]) => `void` |

#### Returns

`any`

#### Inherited from

makeKubeObject<KubeRole\>('role').apiList

#### Defined in

[lib/k8s/cluster.ts:60](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/cluster.ts#L60)

___

### getErrorMessage

▸ `Static` **getErrorMessage**(`err?`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | ``null`` \| [`ApiError`](../interfaces/lib_k8s_apiProxy.ApiError.md) |

#### Returns

``null`` \| `string`

#### Inherited from

makeKubeObject<KubeRole\>('role').getErrorMessage

#### Defined in

[lib/k8s/cluster.ts:75](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/cluster.ts#L75)

___

### useApiGet

▸ `Static` **useApiGet**(`onGet`, `name`, `namespace?`, `onError?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onGet` | (...`args`: `any`) => `void` |
| `name` | `string` |
| `namespace?` | `string` |
| `onError?` | (`err`: [`ApiError`](../interfaces/lib_k8s_apiProxy.ApiError.md)) => `void` |

#### Returns

`void`

#### Inherited from

makeKubeObject<KubeRole\>('role').useApiGet

#### Defined in

[lib/k8s/cluster.ts:66](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/cluster.ts#L66)

___

### useApiList

▸ `Static` **useApiList**(`onList`, `onError?`, `opts?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onList` | (`arg`: `any`[]) => `void` |
| `onError?` | (`err`: [`ApiError`](../interfaces/lib_k8s_apiProxy.ApiError.md)) => `void` |
| `opts?` | [`ApiListOptions`](../interfaces/lib_k8s_cluster.ApiListOptions.md) |

#### Returns

`any`

#### Inherited from

makeKubeObject<KubeRole\>('role').useApiList

#### Defined in

[lib/k8s/cluster.ts:61](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/cluster.ts#L61)

___

### useList

▸ `Static` **useList**(`opts?`): [`any`[], ``null`` \| [`ApiError`](../interfaces/lib_k8s_apiProxy.ApiError.md), (`items`: `any`[]) => `void`, (`err`: ``null`` \| [`ApiError`](../interfaces/lib_k8s_apiProxy.ApiError.md)) => `void`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`ApiListOptions`](../interfaces/lib_k8s_cluster.ApiListOptions.md) |

#### Returns

[`any`[], ``null`` \| [`ApiError`](../interfaces/lib_k8s_apiProxy.ApiError.md), (`items`: `any`[]) => `void`, (`err`: ``null`` \| [`ApiError`](../interfaces/lib_k8s_apiProxy.ApiError.md)) => `void`]

#### Inherited from

makeKubeObject<KubeRole\>('role').useList

#### Defined in

[lib/k8s/cluster.ts:72](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/k8s/cluster.ts#L72)
