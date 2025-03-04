import * as CommonComponents from './components/common';
import * as K8s from './lib/k8s';
import * as ApiProxy from './lib/k8s/apiProxy';
import * as Notification from './lib/notification';
import * as Router from './lib/router';
import * as Utils from './lib/util';
import { Headlamp, Plugin } from './plugin/lib';
import Registry, {
  AppLogoProps,
  ClusterChooserProps,
  DefaultSidebars,
  DetailsViewDefaultHeaderActions,
  DetailsViewSectionProps,
  registerAppBarAction,
  registerAppLogo,
  registerClusterChooser,
  registerDetailsViewHeaderAction,
  registerDetailsViewHeaderActionsProcessor,
  registerDetailsViewSection,
  registerGetTokenFunction,
  registerRoute,
  registerRouteFilter,
  registerSidebarEntry,
  registerSidebarEntryFilter,
} from './plugin/registry';

// We export k8s (lowercase) since someone may use it as we do in the Headlamp source code.
export {
  ApiProxy,
  K8s,
  K8s as k8s,
  CommonComponents,
  Utils,
  Router,
  Plugin,
  Registry,
  Headlamp,
  Notification,
  DetailsViewDefaultHeaderActions,
  registerAppLogo,
  registerAppBarAction,
  registerClusterChooser,
  registerDetailsViewHeaderAction,
  registerDetailsViewSection,
  registerRoute,
  registerRouteFilter,
  registerSidebarEntry,
  registerSidebarEntryFilter,
  registerDetailsViewHeaderActionsProcessor,
  registerGetTokenFunction,
};

export type { AppLogoProps, ClusterChooserProps, DetailsViewSectionProps, DefaultSidebars };
