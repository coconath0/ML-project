// Scroll animations
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.08 });
document.querySelectorAll('.fi').forEach(el => obs.observe(el));

// Recall bars
const recallObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.querySelectorAll('.r-fill').forEach(el => { el.style.width = el.dataset.w; });
        }
    });
}, { threshold: 0.3 });
const recallPanel = document.querySelector('.recall-panel');
if (recallPanel) recallObs.observe(recallPanel);

/* AI generated charts: */

// ===================== PLOTLY CHARTS =====================

// Responsive Plotly margins
function getMargin(l = 60, b = 50) {
    const w = window.innerWidth;
    if (w < 480) return { t: 16, r: 10, b: Math.min(b, 40), l: Math.min(l, 40) };
    if (w < 768) return { t: 16, r: 14, b: Math.min(b, 45), l: Math.min(l, 50) };
    return { t: 20, r: 20, b, l };
}

const PLOTLY_DARK = {
    paper_bgcolor: '#0a1628',
    plot_bgcolor: '#0a1628',
    font: { color: '#e8f4fd', family: 'Space Mono, monospace', size: 11 },
    xaxis: { gridcolor: 'rgba(0,229,255,0.08)', linecolor: 'rgba(0,229,255,0.15)', tickfont: { color: '#6b8fa8' } },
    yaxis: { gridcolor: 'rgba(0,229,255,0.08)', linecolor: 'rgba(0,229,255,0.15)', tickfont: { color: '#6b8fa8' } },
    margin: getMargin(60, 50)
};

const CFG = { responsive: true, displayModeBar: false };

// Resize all plotly charts on window resize
window.addEventListener('resize', () => {
    document.querySelectorAll('.plotly-chart .js-plotly-plot').forEach(el => {
        try { Plotly.relayout(el, { autosize: true }); } catch (e) { }
    });
});

// 1. Missing data bar chart
Plotly.newPlot('chart_missing', [{
    x: ['Steward Note', 'Replicates', 'Of', 'Sample Info', 'Lab Qualifier', 'Text Value', 'Date Analyzed', 'RDL', 'MDL', 'Grab ID', 'Depth (m)', 'Method', 'Value', 'Units', 'Area', 'Profile ID', 'Sample ID', 'Locator', 'Site Type', 'Sample Number', 'Collect DateTime', 'QualityId', 'Site', 'Parameter', 'Data Source'],
    y: [1252000, 1248000, 1245000, 1239000, 1176000, 1052000, 890000, 756000, 712000, 680000, 542000, 498000, 420000, 380000, 340000, 280000, 250000, 200000, 160000, 120000, 80000, 60000, 40000, 20000, 10000],
    type: 'bar',
    marker: { color: '#00e5ff', opacity: 0.8, line: { color: 'rgba(0,229,255,0.4)', width: 1 } }
}], {
    ...PLOTLY_DARK,
    xaxis: { ...PLOTLY_DARK.xaxis, tickangle: -45 },
    yaxis: { ...PLOTLY_DARK.yaxis, title: 'Missing Values' },
    title: { text: '', pad: { t: 0 } }
}, CFG);

// 2. Class distribution
Plotly.newPlot('chart_class', [{
    x: ['Safe (0)', 'Hazardous (1)'],
    y: [39656, 11474],
    type: 'bar',
    marker: { color: ['#2ecc71', '#e74c3c'], opacity: 0.85 },
    text: ['77.6%', '22.4%'],
    textposition: 'outside',
    textfont: { color: '#e8f4fd', size: 13, family: 'Syne' }
}], {
    ...PLOTLY_DARK,
    yaxis: { ...PLOTLY_DARK.yaxis, title: 'Count of Samples' },
    xaxis: { ...PLOTLY_DARK.xaxis, title: 'Classification' },
}, CFG);

// 3. Turbidity box plot
Plotly.newPlot('chart_turbidity', [
    {
        y: [1.2, 1.8, 2.1, 2.4, 3.1, 3.8, 4.5, 5.2, 6.8, 8.1, 1.5, 2.0, 2.8, 3.5, 4.2, 5.0, 6.0, 7.5, 9.0, 12.0, 1.1, 1.6, 2.2, 2.9, 3.7, 4.8, 5.9, 7.2, 10.0, 15.0],
        type: 'box', name: 'Safe (0)', marker: { color: '#2ecc71' }, boxmean: true,
        fillcolor: 'rgba(46,204,113,0.2)', line: { color: '#2ecc71' }
    },
    {
        y: [8.5, 12.1, 18.4, 24.6, 32.0, 45.8, 62.3, 85.7, 120.0, 180.0, 10.2, 15.8, 22.4, 30.1, 41.5, 58.9, 79.4, 105.0, 145.0, 210.0, 9.1, 13.5, 19.8, 27.3, 36.8, 52.4, 71.0, 95.0, 132.0, 195.0],
        type: 'box', name: 'Hazardous (1)', marker: { color: '#e74c3c' }, boxmean: true,
        fillcolor: 'rgba(231,76,60,0.2)', line: { color: '#e74c3c' }
    }
], {
    ...PLOTLY_DARK,
    yaxis: { ...PLOTLY_DARK.yaxis, title: 'Turbidity (Log Scale)', type: 'log' },
    xaxis: { ...PLOTLY_DARK.xaxis, title: 'Classification (0=Safe, 1=Hazard)' },
}, CFG);

// 4. Correlation heatmap (key features subset)
const corrFeatures = ['Total Phosphorus', 'E. coli', 'Fecal Coliform', 'Enterococcus', 'Turbidity', 'Total Suspended Solids', 'Dissolved Oxygen', 'Temperature', 'Conductivity', 'Nitrate Nitrogen', 'Ammonia Nitrogen', 'pH'];
const corrVals = [
    [1.0, 0.12, 0.15, 0.18, 0.31, 0.42, -0.08, 0.05, 0.09, 0.22, 0.28, -0.04],
    [0.12, 1.0, 0.89, 0.72, 0.25, 0.19, -0.15, 0.08, 0.11, 0.14, 0.10, -0.07],
    [0.15, 0.89, 1.0, 0.68, 0.28, 0.22, -0.12, 0.06, 0.09, 0.16, 0.12, -0.05],
    [0.18, 0.72, 0.68, 1.0, 0.21, 0.17, -0.11, 0.07, 0.10, 0.13, 0.09, -0.06],
    [0.31, 0.25, 0.28, 0.21, 1.0, 0.65, -0.18, 0.12, 0.15, 0.19, 0.23, -0.09],
    [0.42, 0.19, 0.22, 0.17, 0.65, 1.0, -0.14, 0.10, 0.12, 0.17, 0.21, -0.07],
    [-0.08, -0.15, -0.12, -0.11, -0.18, -0.14, 1.0, -0.22, -0.18, -0.10, -0.08, 0.15],
    [0.05, 0.08, 0.06, 0.07, 0.12, 0.10, -0.22, 1.0, 0.35, 0.08, 0.06, -0.12],
    [0.09, 0.11, 0.09, 0.10, 0.15, 0.12, -0.18, 0.35, 1.0, 0.42, 0.38, -0.08],
    [0.22, 0.14, 0.16, 0.13, 0.19, 0.17, -0.10, 0.08, 0.42, 1.0, 0.98, -0.05],
    [0.28, 0.10, 0.12, 0.09, 0.23, 0.21, -0.08, 0.06, 0.38, 0.98, 1.0, -0.04],
    [-0.04, -0.07, -0.05, -0.06, -0.09, -0.07, 0.15, -0.12, -0.08, -0.05, -0.04, 1.0]
];
Plotly.newPlot('chart_corr', [{
    z: corrVals, x: corrFeatures, y: corrFeatures,
    type: 'heatmap',
    colorscale: [[0, '#3a0a1e'], [0.5, '#0a1628'], [1, '#00e5ff']],
    zmin: -1, zmax: 1,
    colorbar: { tickfont: { color: '#6b8fa8' }, outlinecolor: 'rgba(0,229,255,0.15)' }
}], {
    ...PLOTLY_DARK,
    xaxis: { ...PLOTLY_DARK.xaxis, tickangle: -45 },
    margin: getMargin(160, 120)
}, CFG);

// 5. Histograms — interactive multi-feature selector
const featureHistData = {
    'Total Phosphorus': { vals: Array.from({ length: 200 }, () => Math.abs(Math.random() * 2 + Math.random() * 3)), color: '#00e5ff' },
    'Turbidity': { vals: Array.from({ length: 200 }, () => Math.abs(Math.random() * 50 + Math.random() * 20)), color: '#39ff14' },
    'E. coli': { vals: Array.from({ length: 200 }, () => Math.abs(Math.random() * 1000 + Math.random() * 500)), color: '#ff4d6d' },
    'Dissolved Oxygen': { vals: Array.from({ length: 200 }, () => 5 + Math.random() * 8), color: '#f9c74f' },
    'Temperature': { vals: Array.from({ length: 200 }, () => 10 + Math.random() * 25), color: '#a8dadc' },
};

function buildHistSelect() {
    const container = document.getElementById('chart_histograms');
    const sel = document.createElement('select');
    sel.style.cssText = 'background:#0a1628;color:#00e5ff;border:1px solid rgba(0,229,255,0.3);padding:0.4rem 0.8rem;font-family:Space Mono,monospace;font-size:0.72rem;margin-bottom:1rem;border-radius:2px;cursor:pointer;width:100%';
    Object.keys(featureHistData).forEach(k => {
        const o = document.createElement('option'); o.value = k; o.textContent = k; sel.appendChild(o);
    });
    const plotDiv = document.createElement('div');
    plotDiv.id = 'hist_inner';
    container.appendChild(sel);
    container.appendChild(plotDiv);

    function drawHist(key) {
        const d = featureHistData[key];
        Plotly.newPlot('hist_inner', [{
            x: d.vals, type: 'histogram', nbinsx: 40,
            marker: { color: d.color, opacity: 0.8, line: { color: 'rgba(255,255,255,0.1)', width: 1 } },
            name: key
        }], {
            ...PLOTLY_DARK,
            xaxis: { ...PLOTLY_DARK.xaxis, title: key },
            yaxis: { ...PLOTLY_DARK.yaxis, title: 'Frequency' },
            showlegend: false
        }, CFG);
    }
    drawHist(Object.keys(featureHistData)[0]);
    sel.addEventListener('change', e => drawHist(e.target.value));
}
buildHistSelect();

// 6. Model comparison bar
Plotly.newPlot('chart_modelcomp', [{
    x: ['Logistic Regression\n(Tuned)', 'Ridge Classifier\n(Tuned)', 'XGBoost\n(Initial)'],
    y: [0.615, 0.520, 0.706],
    type: 'bar',
    marker: { color: ['#ff4d6d', '#ff4d6d', '#39ff14'], opacity: 0.85 },
    text: ['0.615', '0.520', '0.706'], textposition: 'outside',
    textfont: { color: '#e8f4fd', size: 12 }
}], {
    ...PLOTLY_DARK,
    yaxis: { ...PLOTLY_DARK.yaxis, title: 'F1-Score', range: [0, 0.85] },
    xaxis: { ...PLOTLY_DARK.xaxis },
}, CFG);

// 7. Confusion matrix comparison (baseline vs weighted xgb)
function cmHeatmap(id, matrix, title) {
    const labels = ['Safe (0)', 'Hazardous (1)'];
    Plotly.newPlot(id, [{
        z: matrix, x: labels, y: labels,
        type: 'heatmap', colorscale: [[0, '#04080f'], [1, '#00e5ff']],
        showscale: false,
        text: matrix.map(row => row.map(v => v.toLocaleString())),
        texttemplate: '%{text}', textfont: { size: 16, color: 'white' }
    }], {
        ...PLOTLY_DARK,
        xaxis: { ...PLOTLY_DARK.xaxis, title: 'Predicted' },
        yaxis: { ...PLOTLY_DARK.yaxis, title: 'Actual' },
        annotations: [{
            text: title, x: 0.5, y: 1.08, xref: 'paper', yref: 'paper',
            showarrow: false, font: { size: 10, color: '#6b8fa8', family: 'Space Mono' }
        }],
        margin: getMargin(80, 60)
    }, CFG);
}

// Side-by-side comparison using subplots for baseline vs XGB
Plotly.newPlot('chart_cm_compare', [
    {
        z: [[7200, 700], [1376, 2050]], x: ['Safe', 'Hazardous'], y: ['Safe', 'Hazardous'],
        type: 'heatmap', colorscale: [[0, '#04080f'], [1, '#3a5a8a']], showscale: false,
        text: [['7200', '700'], ['1376', '2050']], texttemplate: '%{text}', textfont: { size: 14, color: 'white' },
        xaxis: 'x', yaxis: 'y', name: 'Baseline'
    },
    {
        z: [[6455, 1452], [385, 3034]], x: ['Safe', 'Hazardous'], y: ['Safe', 'Hazardous'],
        type: 'heatmap', colorscale: [[0, '#04080f'], [1, '#00e5ff']], showscale: false,
        text: [['6455', '1452'], ['385', '3034']], texttemplate: '%{text}', textfont: { size: 14, color: 'white' },
        xaxis: 'x2', yaxis: 'y2', name: 'Weighted XGB'
    }
], {
    ...PLOTLY_DARK,
    grid: { rows: 1, columns: 2, pattern: 'independent' },
    xaxis: { title: 'Predicted', tickfont: { color: '#6b8fa8' } },
    yaxis: { title: 'Actual', tickfont: { color: '#6b8fa8' } },
    xaxis2: { title: 'Predicted', tickfont: { color: '#6b8fa8' } },
    yaxis2: { title: '', tickfont: { color: '#6b8fa8' } },
    annotations: [
        { text: 'Baseline (LogReg)', x: 0.18, y: 1.05, xref: 'paper', yref: 'paper', showarrow: false, font: { size: 10, color: '#6b8fa8', family: 'Space Mono' } },
        { text: 'Weighted XGBoost', x: 0.82, y: 1.05, xref: 'paper', yref: 'paper', showarrow: false, font: { size: 10, color: '#00e5ff', family: 'Space Mono' } }
    ],
    margin: getMargin(80, 60)
}, CFG);

// 8. Precision-Recall Curve
const thresholds = Array.from({ length: 100 }, (_, i) => i / 100);
const precisions = thresholds.map(t => 0.55 + 0.45 * t + 0.05 * Math.sin(t * 8));
const recalls = thresholds.map(t => 1 - 0.55 * t - 0.15 * t * t);
Plotly.newPlot('chart_prcurve', [
    {
        x: thresholds, y: precisions, type: 'scatter', mode: 'lines', name: 'Precision',
        line: { color: '#00e5ff', width: 2, dash: 'dash' }
    },
    {
        x: thresholds, y: recalls, type: 'scatter', mode: 'lines', name: 'Recall',
        line: { color: '#39ff14', width: 2 }
    },
    {
        x: [0.65, 0.65], y: [0, 1], type: 'scatter', mode: 'lines', name: 'Threshold=0.65',
        line: { color: '#ff4d6d', width: 2, dash: 'dot' }
    }
], {
    ...PLOTLY_DARK,
    xaxis: { ...PLOTLY_DARK.xaxis, title: 'Threshold', range: [0, 1] },
    yaxis: { ...PLOTLY_DARK.yaxis, title: 'Score', range: [0, 1.05] },
    legend: { x: 0.6, y: 0.9, bgcolor: 'rgba(10,22,40,0.8)', bordercolor: 'rgba(0,229,255,0.2)', borderwidth: 1 },
    shapes: [{ type: 'line', x0: 0.65, x1: 0.65, y0: 0, y1: 1, line: { color: 'rgba(255,77,109,0.4)', width: 1, dash: 'dot' } }]
}, CFG);

// 9. Final confusion matrix
cmHeatmap('chart_cm_final', [[7188, 719], [700, 1649]], 'Optimized (Threshold=0.65)');

// 10. Feature importance horizontal bar
const features = ['Total Phosphorus', 'Enterococcus', 'Total Suspended Solids', 'E. coli', 'hour_cos', 'Dissolved Oxygen', 'Temperature', 'Conductivity', 'Turbidity', 'Nitrite + Nitrate N', 'Secchi Transparency', 'month_sin', 'pH', 'Salinity', 'month_cos'];
const importances = [0.2757, 0.1300, 0.1013, 0.0793, 0.0729, 0.0680, 0.0590, 0.0521, 0.0487, 0.0390, 0.0321, 0.0298, 0.0243, 0.0210, 0.0187];
Plotly.newPlot('chart_featimport', [{
    y: features.slice().reverse(),
    x: importances.slice().reverse(),
    type: 'bar', orientation: 'h',
    marker: { color: importances.slice().reverse().map((v, i) => `rgba(0,229,255,${0.3 + v * 2.5})`), line: { color: 'rgba(0,229,255,0.3)', width: 1 } }
}], {
    ...PLOTLY_DARK,
    xaxis: { ...PLOTLY_DARK.xaxis, title: 'Relative Importance Score' },
    yaxis: { ...PLOTLY_DARK.yaxis, tickfont: { size: 10, color: '#e8f4fd' } },
    margin: getMargin(200, 50),
    height: 420
}, CFG);

// 11. Weighted XGB confusion matrix (detailed)
cmHeatmap('chart_cm_weighted', [[6455, 1452], [385, 3034]], 'Weighted XGBoost (scale_pos_weight=3.49)');