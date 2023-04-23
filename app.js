'use strict';

Vue.createApp({
    data() {
        return {
            nowOn: 'stopwatch',
            countingUp: false,
            sHours: 0,
            sMinutes: 0,
            sSeconds: 0,
            sDecasecs: 0,
            markers: [],
            countDown: 1,
        };
    },
    watch: {
        sMinutes(value) {
            if(value === 60) {
                this.sMinutes = 0;
                this.sHours++;
            }
        },
        sSeconds(value) {
            if(value === 60) {
                this.sSeconds = 0;
                this.sMinutes++;
            }
        },
        sDecasecs(value) {
            if(value === 10) {
                this.sDecasecs = 0;
                this.sSeconds++;
            }
        }
    },
    computed: {
        sdHours() {
            if(this.sHours) {
                return this.sHours + ':';
            } else {
                return '';
            }
        },
        sdMinutes() {
            if(this.sMinutes < 10) {
                return '0' + this.sMinutes + ':';
            }
            return this.sMinutes + ':';
        },
        sdSeconds() {
            if(this.sSeconds < 10) {
                return '0' + this.sSeconds;
            } else {
                return this.sSeconds;
            }
        }
    },
    methods: {
        count() {
            if(countingUp) {
                clearInterval();
                this.countingUp = false;
            } else {
                setInterval(() => {
                    this.count += 1;
                }, 100);
                //this.countingUp = true;
            }
        },
        reset() {

        },
        mark() {
            this.markers.unshift({
                hours: this.sdHours,
                mins: this.sdMinutes,
                secs: this.sdSeconds,
                dsecs: this.sDecasecs,
            });
        },
        test() {
            this.sSeconds++;
        }
    }
}).mount('#app');