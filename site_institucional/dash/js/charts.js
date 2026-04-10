const ctx = document.getElementById('grafico1');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['01/04', '02/04', '03/04', '04/04', '05/04', '06/04',
                 '07/04', '08/04', '09/04', '10/04', '11/04', '12/04'],
        datasets: [{
            label: 'Média geral de CO₂',
            data: [0.3, 0.4, 0.3, 0.5, 0.4, 0.6,
                   0.5, 0.7, 0.5, 0.4, 0.3, 0.4],
            borderColor: '#910000',
            backgroundColor: 'rgba(145, 0, 0, 0.1)',
            borderWidth: 2,
            pointRadius: 4,
            tension: 0.3,
            fill: true
        }]
    },
    options: {
        plugins: {
            title: { display: true, text: 'Média geral de CO₂ — todos os tanques' }
        },
        scales: {
            y: {
                min: 0,
                max: 1,
                ticks: {
                    stepSize: 0.1,
                    callback: (value) => value.toFixed(1) + '%'
                }
            }
        }
    }
});

const ctx2 = document.getElementById('grafico2');

new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Tanque 1', 'Tanque 2', 'Tanque 3', 'Tanque 4', 'Tanque 5',
                 'Tanque 6', 'Tanque 7', 'Tanque 8', 'Tanque 9', 'Tanque 10'],
        datasets: [{
            label: 'Nível de CO₂',
            data: [0.0001, 0.0003, 0.0005, 0.0002, 0.0004,
                   0.0006, 0.0001, 0.0003, 0.0002, 0.0004],
            backgroundColor: [
                '#520606', '#520606', '#520606', '#520606', '#520606',
                '#520606', '#520606', '#520606', '#520606', '#520606'
            ],
            borderRadius: 4,
            borderWidth: 0
        },
        {
            label: "Faixa Ideal",
            type: 'line',
            data: [0.0004, 0.0004, 0.0004, 0.0004, 0.0004, 0.0004, 0.0004, 0.0004, 0.0004, 0.0004],
            borderColor: 'green',
            borderWidth: 2,
            pointRadius: 0,
            pointHitRadius: 0,
            fill: '+1',
            backgroundColor: 'rgba(0, 180, 0, 0.15)'
        },
                {
            label: "I",
            type: 'line',
            data: [0.0002, 0.0002, 0.0002, 0.0002, 0.0002, 0.0002, 0.0002, 0.0002, 0.0002, 0.0002],
            borderColor: 'green',
            borderWidth: 2,
            pointRadius: 0,
            pointHitRadius: 0,
            fill: false
        }    
    ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Nível de CO₂ por Tanque'
            },
            legend: {
                labels: {
                    filter: (item) => item.text === 'Nível de CO₂' || item.text === 'Faixa Ideal'
                }
            },
            datalabels: {                      
                anchor: 'end',
                align: 'top',
                formatter: (value) => (value * 100).toFixed(4) + '%',
                font: { size: 11 }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: (value) => (value * 100).toFixed(2) + '%'
                }
            }
        }
    }
});