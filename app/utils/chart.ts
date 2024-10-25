import ChartJS from "chart.js/auto";

export class Chart {
  constructor (ctx, dataset) {
    this.ctx = ctx;
    this.dataset = dataset;
  }

  render (style) {
    const { reduce, color, color_area, title, monotone, tension, stepped, subtitle, text_color, tick_color } = style;

    const dataset = reduce ? this.dataset.reduce((a, b) => {
      const index = a.findIndex(d => d.x === b.x);
      if (index < 0) {
        a.push({ x: b.x, y: b.y });
      }
      else {
        a[index].y += b.y;
      }
      return a;
    }, []) : this.dataset.reduce((a, b) => {
      const index = a.findIndex(d => d.x === b.x);
      if (index < 0) {
        a.push({ x: b.x, y: b.y });
      }
      else {
        a[index].y = b.y;
      }
      return a;
    }, []);

    const total = reduce ? dataset.reduce((a, b) => a + b.y, 0) : dataset[dataset.length - 1].y;

    return new ChartJS(this.ctx, {
      type: "line",
      data: {
        datasets: [{
          label: title,
          data: dataset,
          tension,
          backgroundColor: "transparent",
          borderColor: color,
          borderWidth: 2,
          pointRadius: 1.5,
          pointBackgroundColor: color,
          stepped,
          cubicInterpolationMode: monotone ? "monotone" : "default",
          fill: {
            target: "origin",
            above: color_area
          }
        }]
      },
      options: {
        interaction: {
          mode: "index",
          intersect: false
        },
        tooltips: {
          mode: "interpolate",
          intersect: false
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => {
                let label = ctx.dataset.label || "";
                if (ctx.parsed.y !== null) {
                  label = `B./ ${fixed(ctx.parsed.y, 2)}`;
                }
                return label;
              }
            }
          },
          title: {
            display: true,
            text: title,
            color: text_color,
            font: {
              size: 12
            }
          },
          subtitle: {
            display: true,
            text: reduce ? `${subtitle}: B/. ${fixed(total, 2)}` : `${subtitle} ${dataset[dataset.length - 1].x}: B/. ${fixed(total, 2)}`,
            color: text_color,
            font: {
              size: 12,
              weight: "bold"
            },
            padding: {
              top: 10
            },
            position: "bottom",
            align: "start"
          },
          legend: {
            display: false
          }
        },
        responsive: true,
        scales: {
          x: {
            border: {
              color: tick_color
            },
            grid: {
              color: tick_color,
              tickColor: tick_color
            },
            display: true,
            stacked: true,
            ticks: {
              color: text_color,
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0
            }
          },
          y: {
            border: {
              color: tick_color
            },
            grid: {
              color: tick_color,
              tickColor: tick_color
            },
            ticks: {
              callback: (value) => {
                return `B/. ${fixed(value, 2)}`;
              },
              color: text_color,
              stepSize: 0.25,
              font: {
                size: 10
              },
              autoSkip: true
            },
            stacked: true,
            beginAtZero: true
          }
        }
      }
    });
  }

  destroy () {
    this.chart.destroy();
  }

  static getInstances () {
    return Object.values(ChartJS.instances);
  }

  static destroyAll () {
    this.getInstances().forEach(chart => chart.destroy());
  }
}
