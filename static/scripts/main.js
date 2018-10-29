$(document).ready(function () {

  var data = [];
  var currId = -1;
  var searchQuery = '';
  var oldSearchQuery= '';
  var pagination = 0;

  getJobs();

  $('#searchLocation').keypress(function(e){
    if(e.which == 13){
      prepareQuery();
    }
  });

  $('#searchLanguage').keypress(function(e){
    if(e.which == 13){
      prepareQuery();
    }
  });

  function prepareQuery() {
    var locQuery = $('#searchLocation').val().trim().replace(/ /g, "+");
    var lanQuery = $('#searchLanguage').val().trim().replace(/ /g, "+");
    var fullTime = $('#fullTime:checked').val();

    pagination = 0;
    searchQuery += locQuery ? '&location=' + locQuery : '';
    searchQuery += lanQuery ? '&description=' + lanQuery : '';
    searchQuery += fullTime ? '&full_time=true' : '';

    getJobs(searchQuery);
    oldSearchQuery = searchQuery;
    searchQuery = '';
  }

  function getJobs(q='') {

    var q1 = q ? '?' + q + '&page=' + pagination : '';

    $.ajax({
      dataType: "jsonp",
      url: "https://jobs.github.com/positions.json" + q1,
      success: function (res) {
        data = res;
        currId = -1;
        listJobs();
        showCurrentJob();
      }
    });
  }

  function checkNextPageExists(q) {
    var increasedPagination = pagination + 1;

    var q2 = q ? q + '&page=' + increasedPagination : '?' + q + '&page=' + increasedPagination;

    $.ajax({
      dataType: "jsonp",
      url: "https://jobs.github.com/positions.json" + q2,
      success: function (res) {
        if(res == '') {
          $('#nextPage').hide();
        } else {
          $('#nextPage').show();
        }
      }
    });
  }

  function listJobs() {
    $('#jobs').html(
        data.map((i) => '<li data-id="' + i.id + '">' + i.title + '<br><div style="font-size:11px;">' 
          + i.company + '</div></li>').join('')
    )
  }

  function showCurrentJob() {
    if (currId >= 0) {
      var active = data[currId];
      $('#show-job').css('display', 'block');
      $('#job').text(active.title ? active.title: '');
      $('#location').text(active.location ? 'Location: ' + active.location: '');
      $('#job-description').html(active.description ? 'Description:<br><br>' + active.description : '');
    } else {
      $('#show-job').css('display', 'none');
    }
  }

  $('#nextPage').on('click', function(e){
    pagination++;

    getJobs(oldSearchQuery);
  });


  $('#jobs').on('click', 'li', function () {
    var jobId = $(this).data('id');

    $(this).addClass('active').siblings().removeClass('active');

    data.forEach(function(element, index){
      if (jobId === element.id) {
        currId = index;
      }
    });

    showCurrentJob();
  })
})
