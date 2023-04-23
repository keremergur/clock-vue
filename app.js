'use strict';

Vue.createApp({
    data() {
        return {
            nowOn: 'stopwatch',
            sInit: true,
            countingUp: false,
            sInterval: null,
            sHours: 0,
            sMinutes: 0,
            sSeconds: 0,
            sDecasecs: 0,
            markers: [],
            countingDown: false,
            tInterval: null,
            tHours: 0,
            tMinutes: 0,
            tSeconds: 0,
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
        countUp() {
            this.sInit = false;
            if(!this.countingUp) {
                this.sInterval = setInterval(() => {
                    this.sDecasecs++;
                }, 100);
                this.countingUp = true;
            }
        },
        sStop() {
            if(this.countingUp) {
                clearInterval(this.sInterval);
                this.countingUp = false;
            } else {
                this.reset();
            }
        },
        reset() {
            this.sInit = true;
            this.sHours = 0;
            this.sMinutes = 0;
            this.sSeconds = 0;
            this.sDecasecs = 0;
        },
        mark() {
            this.markers.unshift({
                hours: this.sdHours,
                mins: this.sdMinutes,
                secs: this.sdSeconds,
                dsecs: this.sDecasecs,
            });
        },
        countDown() {

        },
        tStop() {

        },
    }
}).mount('#app');