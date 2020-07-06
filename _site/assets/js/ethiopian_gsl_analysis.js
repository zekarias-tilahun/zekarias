Chart.defaults.global.animation.duration = 200;

function updateObject(obj, key, val) {
    if (key in obj) {
        obj[key].add(val);
    } else {
        obj[key] = new Set([val]);
    }
}

d3.csv("/assets/stats/all.csv").then(allSingersPlot);

function plot(words, counts, chart) {
    ctx = document.getElementById(chart).getContext("2d");
    wc = [words, counts];
    lblIndex = 0;
    dtIndex = 1;
    lbls = wc[lblIndex];
    dt = wc[dtIndex];
    barType = lblIndex === 0 ? "bar" : "horizontalBar";
    data = {
        labels: lbls,
        datasets: [
            {
                label: "በሁሉም ዘማሪያን ጥቅም ላይ የዋለበት መጠን",
                backgroundColor: "rgb(0, 0, 255)",
                data: dt,
            },
        ],
        options: {
            // legend: {
            //     display: false,
            // },
            title: {
                display: true,
                text: "Test",
            },
        },
    };
    config = {
        type: barType,
        data: data,
    };
    return new Chart(ctx, config);
}
function allSingersPlot(allData) {
    allData = allData.slice(0, 100);
    words = [];
    counts = [];
    for (let i = 0; i < allData.length; i++) {
        wordCount = allData[i];
        words.push(wordCount["word"]);
        counts.push(wordCount["frequency"]);
    }

    plot(words, counts, "allChart");
}

d3.csv("/assets/stats/all_per_year.csv").then(allSingersPerYearPlot);

function allSingersPerYearPlot(allYearlyData) {
    lookup = {};

    allYearlyData.forEach((current) => {
        year = current["year"];
        word = current["word"];
        count = current["frequency"];
        if (year in lookup) {
            lookup[year][0].push(word);
            lookup[year][1].push(count);
        } else {
            lookup[year] = [[word], [count]];
        }
    });
    function getSelectedYearData(year) {
        currentYearData = lookup[year];
        words = currentYearData[0];
        counts = currentYearData[1];
        return { words: words, counts: counts };
    }

    years = Object.keys(lookup);
    year_labels = years.map(function (year) {
        return year === "0" ? "የማይታወቅ" : year;
    });

    currentYearData = getSelectedYearData(0);
    var chart = plot(
        currentYearData.words,
        currentYearData.counts,
        "allYearlyChart"
    );

    $(".js-range-slider").ionRangeSlider({
        values: year_labels,
        grid: true,
        skin: "sharp",
        onChange: function (data) {
            chart.destroy();
            year = data.from_value === "የማይታወቅ" ? 0 : data.from_value;
            console.log(year);
            currentYearData = getSelectedYearData(year);
            chart = plot(
                currentYearData.words,
                currentYearData.counts,
                "allYearlyChart"
            );
        },
    });
}
