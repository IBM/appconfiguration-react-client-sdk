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

import React from 'react';

import { AppConfigContext, Consumer } from './context';

export interface AppConfigProps {
    features?: any;
    properties?: any;
}

function withAppConfigConsumer() {
  return function withAppConfigConsumerHoC<P>(WrappedComponent: React.ComponentType<P & AppConfigProps>) {
    return function (props: P) {
      return (
        <Consumer>
          {({ features, properties }: AppConfigContext) => <WrappedComponent features={features} properties={properties} {...props} />}
        </Consumer>
      );
    };
  };
}

export default withAppConfigConsumer;
