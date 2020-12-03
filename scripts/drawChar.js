

draw();

function draw() {
    let token = sessionStorage.getItem("LoginToken");
    if(!token)
    {
      window.location.href = "index.html"
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', token);
    fetch(BACKEND_URL + "/urls/dashboardData", {
      headers: myHeaders

    }).then((res) => res.json()).then((res) => {

        if (res.result && res.body.urls_per_month_result.length > 0) {
            let labels = res.body.urls_per_month_result.map(e => e["month"]);
            let data = res.body.urls_per_month_result.map(e => e["count"]);
            document.getElementById("alertChart1").style.display = "none";
            let ctx = document.getElementById("myChart");
            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: '# urls per month',
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        ]
                    }
                }
            });


        }
        else{
          document.getElementById("myChart").style.display = "none";
        }

        if (res.result && res.body.urls_per_day_result.length > 0) {
          let labels = res.body.urls_per_day_result.map(e => e["_id"]);
          let data = res.body.urls_per_day_result.map(e => e["count"]);
          document.getElementById("alertChart2").style.display = "none";
          let ctx = document.getElementById("myChart2");
          let myChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: '# urls per day',
                          data: data,
                          backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                          borderColor: ['rgba(75, 192, 192, 1)'],
                          borderWidth: 3
                      }
                  ]
              },
              options: {
                  responsive: true,
                  scales: {
                      yAxes: [
                          {
                              ticks: {
                                  beginAtZero: true
                              }
                          }
                      ]
                  }
              }
          });


      }
      else{
        document.getElementById("myChart2").style.display = "none";
      }
    });
}
