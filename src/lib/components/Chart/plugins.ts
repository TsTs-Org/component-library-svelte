
export const htmlLegendPlugin = {
    id: "htmlLegend",
    afterUpdate(chart, args, options) {
        const ul = options.containerRef;

        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach((item) => {
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

const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.classList.add("__chartPlugin-tooltip")
        const table = document.createElement("table");
        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};


export const externalTooltipHandler = (context) => {
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
        const bodyLines = tooltip.body.map((b) => b.lines);

        const tableHead = document.createElement("thead");

        titleLines.forEach((title) => {
            const tr = document.createElement("tr");
            const th = document.createElement("th");
            const text = document.createTextNode(title);
            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
        });

        const tableBody = document.createElement("tbody");
        bodyLines.forEach((body, i) => {
            const colors = tooltip.labelColors[i];
            const splitText = body[0].split(":")

            const span = document.createElement("span");
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;

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
        tableRoot.appendChild(tableHead);
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
