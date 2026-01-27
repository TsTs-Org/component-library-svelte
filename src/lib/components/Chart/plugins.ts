
export const htmlLegendPlugin = {
    id: "htmlLegend",
    afterUpdate(chart: { options: { plugins: { legend: { labels: { generateLabels: (arg0: any) => any; }; }; }; }; config: { type: any; }; toggleDataVisibility: (arg0: any) => void; setDatasetVisibility: (arg0: any, arg1: boolean) => void; isDatasetVisible: (arg0: any) => any; update: () => void; }, args: any, options: { containerRef: any; }) {
        const ul = options.containerRef;

        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach((item: { index: any; datasetIndex: any; fillStyle: string; strokeStyle: string; lineWidth: string; fontColor: string; hidden: any; text: string; }) => {
            const li = document.createElement("li");

            li.onclick = () => {
                const { type } = chart.config;
                if (type === "pie" || type === "doughnut") {
                    // Pie and doughnut charts only have a single dataset and visibility is per item
                    chart.toggleDataVisibility(item.index);
                } else {
                    chart.setDatasetVisibility(
                        item.datasetIndex,
                        !chart.isDatasetVisible(item.datasetIndex)
                    );
                }
                chart.update();
            };

            // Color box
            const boxSpan = document.createElement("span");
            boxSpan.style.background = item.fillStyle;
            boxSpan.style.borderColor = item.strokeStyle;
            boxSpan.style.borderWidth = item.lineWidth + "px";

            // Text
            const textContainer = document.createElement("p");
            textContainer.style.color = item.fontColor;
            textContainer.style.textDecoration = item.hidden ? "line-through" : "";

            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            li.appendChild(boxSpan);
            li.appendChild(textContainer);
            ul.appendChild(li);
        });
    },
};

// --------------------- Custom Tooltip ---------------------

const getOrCreateTooltip = (chart: { canvas: { parentNode: { querySelector: (arg0: string) => any; appendChild: (arg0: any) => void; }; }; }) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.classList.add("__chartPlugin-tooltip")
        const table = document.createElement("table");
        const heading = document.createElement("h5");
        tooltipEl.appendChild(heading);
        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};


export const externalTooltipHandler = (context: { chart: any; tooltip: any; }) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b: { lines: any; }) => b.lines);

        titleLines.forEach((title: any) => {
            tooltipEl.querySelector("h5").innerText = title;
        });

        const tableBody = document.createElement("tbody");
        bodyLines.forEach((body: string[], i: string | number) => {
            const colors = tooltip.labelColors[i];
            const splitText = body[0].split(":")

            const span = document.createElement("span");
            span.style.background = chart.config._config.type == "doughnut" ? colors.backgroundColor : colors.borderColor;
            span.style.borderColor = chart.config._config.type == "doughnut" ? colors.backgroundColor : colors.borderColor;

            const tr = document.createElement("tr");
            const tdColor = document.createElement("td");
            const tdText = document.createElement("td");
            const tdValue = document.createElement("td");
            const text = document.createTextNode(splitText[0]);
            const value = document.createTextNode(splitText[1]);

            tdColor.appendChild(span);
            tdText.appendChild(text);
            tdValue.appendChild(value);
            
            tr.appendChild(tdColor);
            tr.appendChild(tdText);
            tr.appendChild(tdValue);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector("table");

        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + "px " + tooltip.options.padding + "px";
};
