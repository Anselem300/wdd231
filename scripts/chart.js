// Creating graph using Chart.js

const ctx = document.getElementById("myChart").getContext("2d");

const labels = [];
const now = new Date();
for (let i = 0; i < 30; i++){
    const day = new Date(now);
    day.setDate(now.getDate() - i);
    labels.unshift(day.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}));
}

const info = Array.from({length: 30}, () => Math.floor(Math.random() * 100));

const myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: 'Profit',
            data: info,
            backgroundColor: ['rgba(179, 113, 51, 0.2)', 'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgb(148, 83, 99)',
                'rgb(168, 193, 206)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value){
                        return `$${value}`;
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context){
                        return `$${context.parsed.y}`;
                    }
                }
            }
        }
    }
});

const total30Days = info.reduce((sum, val) => sum + val, 0);
document.getElementById("totalEarnings").textContent = `Total Estimated Earnings (Last 30 Days): $${total30Days.toLocaleString()}`;

// creating graph using D3.js
// const data = [10, 20, 30, 40, 50];
// const svg = d3.select("svg");
// const xScale = d3.scaleBand()
// .domain(data.map((d, i) => i))
// .range([0, 500])
// .padding(0.2);

// const yScale = d3.scaleLinear()
// .domain([0, 50])
// .range([300, 0]);

// svg.selectAll('rect')
// .data(data)
// .enter()
// .append("rect")
// .attr("x", (d, i) => xScale(i))
// .attr("y", d => yScale(d))
// .attr("width", xScale.bandwidth())
// .attr("height", d => 300 - yScale(d))
// .attr("fill", "steelblue");

// // Add labels
// svg.selectAll("text")
// .data(data)
// .enter()
// .append("text")
// .text(d => d)
// .attr("x", (d, i) => yScale(i) + xScale.bandwidth()/2)
// .attr('y', d => yScale(d) - 5)
// .attr('text-anchor', 'middle')
// .attr("font-size", '12px')
// .attr("fill", "black");