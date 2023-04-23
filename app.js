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
        },
        tHours(value) {
            if(value === -1) {
                this.tStop();
                this.tReset();
                alert('Timer finished!');
            }
        },
        tMinutes(value) {
            if(value === -1) {
                this.tHours--;
                this.tMinutes = 59;
            }
        },
        tSeconds(value) {
            if(value === -1) {
                this.tMinutes--;
                this.tSeconds = 59;
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
        },
        tdHours() {
            if(this.tHours) {
                return this.tHours + ':';
            } else {
                return '';
            }
        },
        tdMinutes() {
            if(this.tMinutes < 10) {
                return '0' + this.tMinutes + ':';
            }
            return this.tMinutes + ':';
        },
        tdSeconds() {
            if(this.tSeconds < 10) {
                return '0' + this.tSeconds;
            } else {
                return this.tSeconds;
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
                this.sReset();
            }
        },
        sReset() {
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
            if(!this.countingDown) {
                this.tInterval = setInterval(() => {
                    this.tSeconds--;
                }, 1000);
                this.countingDown = true;
            }
        },
        tStop() {
            if(this.countingDown) {
                clearInterval(this.tInterval);
                this.countingDown = false;
            } else {
                this.tReset();
            }
        },
        tReset() {
            this.tHours = 0;
            this.tMinutes = 0;
            this.tSeconds = 0;
        },
    }
}).mount('#app');