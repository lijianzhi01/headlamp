---
title: "Module: lib/router"
linkTitle: "lib/router"
slug: "lib_router"
---

## Interfaces

- [Route](../interfaces/lib_router.Route.md)
- [RouteURLProps](../interfaces/lib_router.RouteURLProps.md)

## Variables

### NotFoundRoute

• `Const` **NotFoundRoute**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `component` | () => `Element` |
| `exact` | `boolean` |
| `name` | `string` |
| `noAuthRequired` | `boolean` |
| `path` | `string` |
| `sidebar` | ``null`` |

#### Defined in

[lib/router.tsx:438](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/router.tsx#L438)

## Functions

### createRouteURL

▸ **createRouteURL**(`routeName`, `params?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeName` | `string` |
| `params` | [`RouteURLProps`](../interfaces/lib_router.RouteURLProps.md) |

#### Returns

`string`

#### Defined in

[lib/router.tsx:496](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/router.tsx#L496)

___

### getDefaultRoutes

▸ **getDefaultRoutes**(): `Object`

#### Returns

`Object`

#### Defined in

[lib/router.tsx:528](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/router.tsx#L528)

___

### getRoute

▸ **getRoute**(`routeName`): [`Route`](../interfaces/lib_router.Route.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeName` | `string` |

#### Returns

[`Route`](../interfaces/lib_router.Route.md)

#### Defined in

[lib/router.tsx:447](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/router.tsx#L447)

___

### getRoutePath

▸ **getRoutePath**(`route`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `route` | [`Route`](../interfaces/lib_router.Route.md) |

#### Returns

`string`

#### Defined in

[lib/router.tsx:480](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/router.tsx#L480)

___

### getRouteUseClusterURL

▸ **getRouteUseClusterURL**(`route`): `boolean`

Should the route use a cluster URL?

#### Parameters

| Name | Type |
| :------ | :------ |
| `route` | [`Route`](../interfaces/lib_router.Route.md) |

#### Returns

`boolean`

true when a cluster URL contains cluster in the URL. eg. /c/minikube/my-url
  false, the URL does not contain the cluster. eg. /my-url

#### Defined in

[lib/router.tsx:468](https://github.com/kinvolk/headlamp/blob/ba073244/frontend/src/lib/router.tsx#L468)
