function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
  }
}

function showPosition(position) {
  var url =
    "https://api.weatherapi.com/v1/current.json?key=f56fe9717704493eb46140919231206&q=" +
    position.coords.latitude +
    "," +
    position.coords.longitude +
    "&aqi=no";

  console.log(url);
  $.ajax({
    method: "GET",
    url: url,
    contentType: "application/json",
    success: function (result) {
      console.log(result);
      $("[data-position]").text(
        result.location.name + ", " + result.location.country
      );
      $("[data-current-temp]").text(result.current.temp_c + "°");
      var options = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      var now = new Date();
      $("[data-date]").text(now.toLocaleDateString("en-US", options));
      $("[data-current-condition]").text(result.current.condition.text);
      $("[data-current-feelslike]").text(result.current.feelslike_c + "°");

      // There are more weather codes in the documentation, but I only used a few
      // Sunny
      if (result.current.condition.code == 1000) {
        $("[data-current-icon]").attr("src", "img/carbon_sun.svg");
        // Cloudy
      } else if (
        result.current.condition.code == 1003 ||
        result.current.condition.code == 1006 ||
        result.current.condition.code == 1009
      ) {
        $("[data-current-icon]").attr("src", "img/carbon_cloud.svg");
        // Rainy
      } else if (
        result.current.condition.code == 1063 ||
        result.current.condition.code == 1153 ||
        result.current.condition.code == 1150 ||
        result.current.condition.code == 1183
      ) {
        $("[data-current-icon]").attr("src", "img/carbon_rain.svg");
        // Snowy
      } else if (
        result.current.condition.code == 1063 ||
        result.current.condition.code == 1114 ||
        result.current.condition.code == 1213
      ) {
        $("[data-current-icon]").attr("src", "img/carbon_snow.svg");
        // Thunder
      } else if (
        result.current.condition.code == 1087 ||
        result.current.condition.code == 1273
      ) {
        $("[data-current-icon]").attr("src", "img/carbon_thunder.svg");
      }
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}
getLocation();
