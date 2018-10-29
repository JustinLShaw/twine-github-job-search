$(document).ready(function () {

  var jsValue = 0;
  var javaValue = 0;
  var cValue = 0;
  var swiftValue = 0;
  var pythonValue = 0;

  var reachedEnd = false;

  var dataEmpty = false;
  var jsPagination = -1;
  var javaPagination = -1;
  var cPagination = -1;
  var swiftPagination = -1;
  var pythonPagination = -1;

  var dummyData = [
          {
              value: 0,
              color:"#878BB6"
          },
          {
              value : 0,
              color : "#4ACAB4"
          },
          {
              value : 0,
              color : "#FF8153"
          },
          {
              value : 0,
              color : "#FFEA88"
          },
          {
              value : 0,
              color : "#F3EA88"
          }
      ];

  var languages= document.getElementById("LanguagePopOverall").getContext("2d");
  var currChart = new Chart(languages).Pie(dummyData);

  getValues();

  $('#searchLocation').keypress(function(e){
    if(e.which == 13){

      $('#header').empty();
      $('#header').append('in ' + $('#searchLocation').val().trim());

      jsPagination = -1;
      javaPagination = -1;
      cPagination = -1;
      swiftPagination = -1;
      pythonPagination = -1;

      getValues($('#searchLocation').val().trim().replace(/ /g, "+"));
    }
  });


function getValues(q=''){

    // Get how many results there are for Javascript 
    getJSJob('?description=javascript&location=' + q);

    // Get how many results there are for Java
    getJavaJob('?description=java&location=' + q);

    // Get how many results there are for C
    getCJob('?description=c&location=' + q);

    // Get how many results there are for Swift
    getSwiftJob('?description=swift&location=' + q);

    // Get how many results there are for Python
    getPythonJob('?description=python&location=' + q);

}

  function updatePie() {

    var pieData = [
            {
                value: jsValue,
                labelColor: "#878BB6",
                labelFontSize: '16',
                color:"#878BB6"
            },
            {
                value : javaValue,
                label: 'Java',
                labelColor: "#4ACAB4",
                labelFontSize: '16',
                color : "#4ACAB4"
            },
            {
                value : cValue,
                label: 'C',
                labelColor: "#FF8153",
                labelFontSize: '16',
                color : "#FF8153"
            },
            {
                value : swiftValue,
                label: 'Swift',
                labelColor: "#928e40",
                labelFontSize: '16',
                color : "#928e40"
            },
            {
                value : pythonValue,
                label: 'Python',
                labelColor: "#853692",
                labelFontSize: '16',
                color : "#853692"
            }
        ];

    new Chart(languages).Pie(pieData);

    document.getElementById("js").innerHTML = 'JavaScript: ' + jsValue + ' listings';
    document.getElementById("java").innerHTML = 'Java: ' + javaValue + ' listings';
    document.getElementById("c").innerHTML = 'C: ' + cValue + ' listings';
    document.getElementById("swift").innerHTML = 'Swift: ' + swiftValue + ' listings';
    document.getElementById("python").innerHTML = 'Python: ' + pythonValue + ' listings';
  }



  function getJSJob(q) {

    jsPagination++;
    
    q1 = q ? q + '&page=' + jsPagination : '';

    $.ajax({
      dataType: "jsonp",
      cache: false,
      url: "https://jobs.github.com/positions.json" + q1,
      success: function (res) {

        if(res.length < 50) {
          lastIndex = jsPagination;
          numElems = res.length;

          var totalElems = (lastIndex) * 50 + numElems;

          if(totalElems > 0) {
            jsValue = totalElems;
          } else {
            jsValue = 0;
          }
          updatePie();
        } else {
          getJSJob(q);
        }
      }
    });
  }

  function getJavaJob(q) {

    javaPagination++;
    
    q1 = q ? q + '&page=' + javaPagination : '';

    $.ajax({
      dataType: "jsonp",
      cache: false,
      url: "https://jobs.github.com/positions.json" + q1,
      success: function (res) {

        if(res.length < 50) {
          lastIndex = javaPagination;
          numElems = res.length;

          var totalElems = (lastIndex) * 50 + numElems;

          if(totalElems > 0) {
            javaValue = totalElems;
          } else {
            javaValue = 0;
          }
          updatePie();
        } else {
          getJavaJob(q);
        }
      }
    });
  }

  function getCJob(q) {

    cPagination++;
    
    q1 = q ? q + '&page=' + cPagination : '';

    $.ajax({
      dataType: "jsonp",
      cache: false,
      url: "https://jobs.github.com/positions.json" + q1,
      success: function (res) {

        if(res.length < 50) {
          lastIndex = cPagination;
          numElems = res.length;

          var totalElems = (lastIndex) * 50 + numElems;

          if(totalElems > 0) {
            cValue = totalElems;
          } else {
            cValue = 0;
          }
          updatePie();
        } else {
          getCJob(q);
        }
      }
    });
  }

  function getSwiftJob(q) {

    swiftPagination++;
    
    q1 = q ? q + '&page=' + swiftPagination : '';

    $.ajax({
      dataType: "jsonp",
      cache: false,
      url: "https://jobs.github.com/positions.json" + q1,
      success: function (res) {

        if(res.length < 50) {
          lastIndex = swiftPagination;
          numElems = res.length;

          var totalElems = (lastIndex) * 50 + numElems;

          if(totalElems > 0) {
            swiftValue = totalElems;
          } else {
            swiftValue = 0;
          }
          updatePie();
        } else {
          getSwiftJob(q);
        }
      }
    });
  }

  function getPythonJob(q) {

    pythonPagination++;
    
    q1 = q ? q + '&page=' + pythonPagination : '';

    $.ajax({
      dataType: "jsonp",
      cache: false,
      url: "https://jobs.github.com/positions.json" + q1,
      success: function (res) {

        if(res.length < 50) {
          lastIndex = pythonPagination;
          numElems = res.length;

          var totalElems = (lastIndex) * 50 + numElems;

          if(totalElems > 0) {
            pythonValue = totalElems;
          } else {
            pythonValue = 0;
          }
          updatePie();
          
        } else {
          getPythonJob(q);
        }
      }
    });
  }
})
