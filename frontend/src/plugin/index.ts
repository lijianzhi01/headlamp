/**
 * The index.ts should have the functions that Headlamp itself needs for
 * loading the plugins.
 * The lib.ts file should carry the bits to be used by plugins whereas
 */

import helpers from '../helpers';
import { Headlamp, Plugin } from './lib';
import { PluginInfo } from './pluginsSlice';
import Registry, {
  DetailsViewDefaultHeaderActions,
  getHeadlampAPIHeaders,
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
} from './registry';

window.pluginLib = {
  ApiProxy: require('../lib/k8s/apiProxy'),
  Crd: require('../lib/k8s/crd'),
  ReactMonacoEditor: require('@monaco-editor/react'),
  MonacoEditor: require(process.env.NODE_ENV === 'test'
    ? 'monaco-editor/esm/vs/editor/editor.api.js'
    : 'monaco-editor'),
  K8s: require('../lib/k8s'),
  CommonComponents: require('../components/common'),
  MuiCore: require('@material-ui/core'),
  MuiStyles: require('@material-ui/styles'),
  MuiLab: require('@material-ui/lab'),
  React: require('react'),
  ReactJSX: require('react/jsx-runtime'),
  ReactDOM: require('react-dom'),
  Recharts: require('recharts'),
  ReactRouter: require('react-router-dom'),
  ReactRedux: require('react-redux'),
  Router: require('../lib/router'),
  Utils: require('../lib/util'),
  Iconify: require('@iconify/react'),
  Lodash: require('lodash'),
  Notistack: require('notistack'),
  Notification: require('../lib/notification'),
  Headlamp,
  Plugin,
  registerAppBarAction,
  registerAppLogo,
  registerClusterChooser,
  registerDetailsViewHeaderAction,
  registerDetailsViewSection,
  registerRoute,
  registerRouteFilter,
  registerSidebarEntry,
  registerSidebarEntryFilter,
  registerGetTokenFunction,
  registerDetailsViewHeaderActionsProcessor,
  DetailsViewDefaultHeaderActions,
  getHeadlampAPIHeaders,
};

// @todo: should window.plugins be private?
// @todo: Should all the plugin objects be in a single window.Headlamp object?
window.plugins = {};

/**
 * Load plugins in the frontend/src/plugin/plugins/ folder.
 *
 * Plugins can be developed inside the headlamp repo.
 * Move them out of the repo to an external location when they are ready.
 *
 * @see Plugin
 */
function loadDevPlugins() {
  const context = require.context(
    './plugins', // Context folder
    true, // Include subdirectories
    // Include one subdirectory level that has an index.js file
    /^\.\/[a-zA-Z_\-0-9]+\/index\.(js|ts|tsx)+$/
  );

  // @todo: keys() is non-deterministic here because filesystems can be non-deterministic.
  //        Loading plugins in sorted() order is probably less problematic.
  for (const module of context.keys()) {
    context(module);
  }
}

/**
 * Load external, then local plugins. Then initialize() them in order with a Registry.
 */
export async function initializePlugins() {
  await loadDevPlugins();

  // Initialize every plugin in the order they were loaded.
  return new Promise(resolve => {
    for (const pluginName of Object.keys(window.plugins)) {
      const plugin = window.plugins[pluginName];
      try {
        // @todo: what should happen if this fails?
        plugin.initialize(new Registry());
      } catch (e) {
        console.error(`Plugin initialize() error in ${pluginName}:`, e);
      }
    }
    resolve(undefined);
  });
}

/**
 * This can be used to filter out which of the plugins we should execute.
 *
 * @param sources array of source to execute. Has the same order as packageInfos.
 * @param packageInfos array of package.json contents
 * @param settingsPackages the packages from settings
 * @param appMode if we are in app mode
 *
 * @returns array of source to execute
 */
export function filterSources(
  sources: string[],
  packageInfos: PluginInfo[],
  appMode: boolean,
  settingsPackages?: PluginInfo[]
) {
  if (!appMode) {
    return sources;
  }
  if (!settingsPackages) {
    // No plugins should be enabled if settings are not set.
    return [];
  }

  // remove the plugins which are not enabled.
  const enabledPlugins = sources.filter((_, i) => {
    const packageInfo = packageInfos[i];

    // settingsPackages might have a different order or length than packageInfos
    const index = settingsPackages.findIndex(x => x.name === packageInfo.name);

    // if it's not in the settings don't enable the plugin
    if (index === -1) return false;

    return settingsPackages[index].isEnabled;
  });

  return enabledPlugins;
}

/**
 * Gives back updates settings from the backend.
 *
 * If there are new plugins, it includes the new ones with isEnabled=true.
 *
 * If plugins are not there anymore in the backend list,
 * then it removes them from the settings list of plugins.
 *
 * @param backendPlugins the list of plugins info from the backend.
 * @param settingsPlugins the list of plugins the settings already knows about.
 * @returns plugin info for the settings.
 */
export function updateSettingsPackages(
  backendPlugins: PluginInfo[],
  settingsPlugins: PluginInfo[]
): PluginInfo[] {
  if (backendPlugins.length === 0) return [];

  const pluginsChanged =
    backendPlugins.length !== settingsPlugins.length ||
    backendPlugins.map(p => p.name + p.version).join('') !==
      settingsPlugins.map(p => p.name + p.version).join('');

  if (!pluginsChanged) {
    return settingsPlugins;
  }

  return backendPlugins.map(plugin => {
    const index = settingsPlugins.findIndex(x => x.name === plugin.name);
    if (index === -1) {
      // It's a new one settings doesn't know about so we do not enable it by default
      return {
        ...plugin,
        isEnabled: true,
      };
    }
    return settingsPlugins[index];
  });
}

/**
 * Get the list of plugins,
 *   download all the plugin source,
 *   download all the plugin package.json files,
 *   execute the plugins,
 *   .initialize() plugins that register (not all do).
 *
 * @param settingsPackages The packages settings knows about.
 * @param onSettingsChange Called when the plugins are different to what is in settings.
 *
 */
export async function fetchAndExecutePlugins(
  settingsPackages: PluginInfo[],
  onSettingsChange: (plugins: PluginInfo[]) => void
) {
  const pluginPaths = (await fetch(`${helpers.getAppUrl()}plugins`).then(resp =>
    resp.json()
  )) as string[];

  const sourcesPromise = Promise.all(
    pluginPaths.map(path =>
      fetch(`${helpers.getAppUrl()}${path}/main.js`).then(resp => resp.text())
    )
  );

  const packageInfosPromise = await Promise.all<PluginInfo>(
    pluginPaths.map(path =>
      fetch(`${helpers.getAppUrl()}${path}/package.json`).then(resp => {
        if (!resp.ok) {
          if (resp.status !== 404) {
            return Promise.reject(resp);
          }
          {
            console.warn(
              'Missing package.json. ' +
                `Please upgrade the plugin ${path}` +
                ' by running "headlamp-plugin extract" again.' +
                ' Please use headlamp-plugin >= 0.6.0'
            );
            return {
              name: path.split('/').slice(-1)[0],
              version: '0.0.0',
              author: 'unknown',
              description: '',
            };
          }
        }
        return resp.json();
      })
    )
  );

  const sources = await sourcesPromise;
  const packageInfos = await packageInfosPromise;

  const updatedSettingsPackages = updateSettingsPackages(packageInfos, settingsPackages);
  const settingsChanged = packageInfos.length !== settingsPackages.length;
  if (settingsChanged) {
    onSettingsChange(updatedSettingsPackages);
  }

  const sourcesToExecute = filterSources(
    sources,
    packageInfos,
    helpers.isElectron(),
    updatedSettingsPackages
  );

  sourcesToExecute.forEach((source, index) => {
    // Execute plugins inside a context (not in global/window)
    (function (str: string) {
      try {
        const result = eval(str);
        return result;
      } catch (e) {
        // We just continue if there is an error.
        console.error(`Plugin execution error in ${pluginPaths[index]}:`, e);
      }
    }.call({}, source));
  });
  await initializePlugins();
}
