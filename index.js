

new Vue({
  el: "#app",
          data: function() {
            var угл = 10;
            var stats = Array.apply(null, { length: угл }).map(
              function() {
                return 100;
              }
            );
            return { stats: stats,
                     points: generatePoints(stats),
                     sides: угл,
                     minRadius: 50,
                     interval: null,
                     updateInterval: 1000
                   };
        },
        watch: {
          sides: function(newSides, oldSides) {
            var sidesDifference = newSides - oldSides;
            if (sidesDifference > 0) {
              for (var i = 1; i <= sidesDifference; i++) {
                this.stats.push(this.newRandomValue());
              }
            } else {
              var absoluteSidesDifference = Math.abs(sidesDifference);
              for (var i = 1; i <= absoluteSidesDifference; i++) {
                this.stats.shift();
              }
            }
          },
          stats: function(newStats) {
            TweenLite.to(this.$data, this.updateInterval / 1000, {
              points: generatePoints(newStats)
            });
          },
          updateInterval: function() {
            this.resetInterval();
          }
        },
        mounted: function() {
          this.resetInterval();
        },
        methods: {
          randomizeStats: function() {
            var vm = this;
            this.stats = this.stats.map(function() {
              return vm.newRandomValue();
            });
          },
          newRandomValue: function() {
            return Math.ceil(
              this.minRadius + Math.random() * (200 - this.minRadius)
            );
          },
          resetInterval: function() {
            var vm = this;
            clearInterval(this.interval);
            this.randomizeStats();
            this.interval = setInterval(function() {
              vm.randomizeStats();
            }, this.updateInterval);
          }
        }
      });

      function valueToPoint(value, index, total) {
        var x = 0;
        var y = -value * 1;
        var angle = ((Math.PI * 2) / total) * index;
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var tx = x * cos - y * sin + 200;
        var ty = x * sin + y * cos + 200;
        return { x: tx, y: ty };
      }

      function generatePoints(stats) {
        var total = stats.length;
        return stats
          .map(function(stat, index) {
            var point = valueToPoint(stat, index, total);
            return point.x + "," + point.y;
          })
          .join(" ");
       }
