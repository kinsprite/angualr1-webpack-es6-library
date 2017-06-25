
/**
 * MyTe22stTask
 *
 * @class Angular1MyTestTask
 */
class Angular1MyTestTask {
    /** @ngInject */
    constructor($log) {
        this.$log = $log;
    }

    doWork() {
        this.$log.log('Doing work at Angular1MyTestLib.');
    }
}

export default Angular1MyTestTask;
