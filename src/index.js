import 'jquery';
import angular from 'angular';

import Angular1MyTestTask from './angular1-my-test-task.service';

const moduleName = 'angular1-webpack-es6-library';

angular
    .module(moduleName, [])
    .service('angular1MyTestTask', Angular1MyTestTask)
;

export default moduleName;
