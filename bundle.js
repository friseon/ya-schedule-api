require('./node_modules/angular/angular.min.js');
require('./node_modules/underscore/underscore-min.js');
require('./public/assets/angular-locale_ru-ru.js');
require('./node_modules/angular-route/angular-route.min');
require('./node_modules/angular-ui-router/release/angular-ui-router.min');
require('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js');
require('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js');
require('./node_modules/angular-animate/angular-animate.min.js');
require('./node_modules/angular-sanitize/angular-sanitize.min.js');
require('./node_modules/ng-toast/dist/ngToast.min.js');

require('./public/assets/app');
require('./public/assets/app.service');
require('./public/assets/app.constants');
require('./public/assets/app.filters');

require('./public/assets/views/admin/admin');
require('./public/assets/views/admin/admin.service');

require('./public/assets/components/lectors/lectors.directive');
require('./public/assets/components/lectors/lectors.service');

require('./public/assets/components/schools/schools.directive');
require('./public/assets/components/schools/schools.service');

require('./public/assets/components/class-rooms/class-rooms.directive');
require('./public/assets/components/class-rooms/class-rooms.service');

require('./public/assets/components/schedule/schedule.directive');
require('./public/assets/components/schedule/schedule.service');

require('./public/assets/components/main-header/main-header.directive');
require('./public/assets/views/home/home');
require('./public/assets/views/login/login');

require('./public/assets/components/modals/modals.constants');

require('./public/assets/components/modals/modalLectorInfo.ctrl');
require('./public/assets/components/modals/modalClassRoomInfo.ctrl.js');

import styles from './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css';
import styles from './node_modules/bootstrap/dist/css/bootstrap.css';
import styles from './node_modules/ng-toast/dist/ngToast.css';
import styles from './node_modules/ng-toast/dist/ngToast-animations.css';
import styles from './public/assets/components/main-header/main-header.scss';

import styles from './public/assets/styles/styles.scss';