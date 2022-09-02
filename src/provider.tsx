/**
 * Copyright 2022 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import AppConfiguration from 'ibm-appconfiguration-js-client-sdk';
import React, { ReactNode, useEffect, useState } from 'react';

import { Provider } from './context';
import { InitConfig } from './types';

export default async function withAppConfigProvider(config: InitConfig) {
  const {
    region, guid, apikey, collectionId, environmentId,
  } = config;
  const appConfigClient = AppConfiguration.getInstance();
  appConfigClient.init(region, guid, apikey);
  await appConfigClient.setContext(collectionId, environmentId);

  return function ({ children }: { children: ReactNode }) {
    const [state, setState] = useState({
      appConfigClient,
      features: appConfigClient.getFeatures(),
      properties: appConfigClient.getProperties(),
    });

    useEffect(() => {
      appConfigClient.emitter.on('configurationUpdate', () => {
        const newFeatures = appConfigClient.getFeatures();
        const newProperties = appConfigClient.getProperties();
        setState((previousState) => ({ ...previousState, features: newFeatures, properties: newProperties }));
      });
    }, []);
    return <Provider value={state}>{children}</Provider>;
  };
}
