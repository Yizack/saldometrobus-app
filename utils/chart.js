import ChartJS from "chart.js/auto";

export class Chart {
  constructor (ctx, dataset) {
    this.ctx = ctx;
    this.dataset = dataset;
  }

  render (style) {
    const { reduce, color, color_area, title, monotone, tension, stepped, subtitle } = style;

    const reduced = reduce
      ? this.dataset.reduce((a, b) => {
        const index = a.findIndex(d => d.x === b.x);
        if (index < 0) {
          a.push({ x: b.x, y: b.y });
        }
        else {
          a[index].y += b.y;
        }
        return a;
      }, [])
      : this.dataset.reduce((a, b) => {
        const index = a.findIndex(d => d.x === b.x);
        if (index < 0) {
          a.push({ x: b.x, y: b.y });
        }
        else {
          a[index].y = b.y;
        }
        return a;
      }, []);
    const dataset = reduced.map(d => ({ x: formatFecha(d.x, "chart", "es"), y: d.y }));
    const total = reduce ? reduced.reduce((a, b) => a + b.y, 0) : reduced[reduced.length - 1].y;

    const tipo = "line";
    return new ChartJS(this.ctx, {
      type: tipo,
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
            font: {
              size: 12
            }
          },
          subtitle: {
            display: true,
            text: reduce ? `${subtitle}: B/. ${fixed(total, 2)}` : `${subtitle} ${dataset[dataset.length - 1].x}: B/. ${fixed(total, 2)}`,
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
            display: true,
            stacked: true,
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0
            }
          },
          y: {
            ticks: {
              callback: (value) => {
                return `B/. ${fixed(value, 2)}`;
              },
              stepSize: 0.25,
              font: {
                size: 8
              }
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
