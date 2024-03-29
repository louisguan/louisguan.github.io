function MQTT() {
  var client = mqtt.connect("wss://broker.mqttgo.io:8084/mqtt") // you add a wss:// url here
  client.on('connect', function() {
    client.subscribe('presence', function(err) {
      if (!err) {
        client.publish('mqtt/AlarmClockFirst', 'Im in~')
      } else {
        console.log("error to MQTT")
      }
    })
  })

  client.on('message', function(topic, message) {
    // message is Buffer
    console.log(message.toString())
    // client.end()
  })
}

function GetDataFromGsheet() {
  var spreadsheet_id = "1DbftDAuDCgde_yJFRJG963JT3tfoRhnglAL7GbwQyCQ", // 填入試算表 ID
    tab_name = "Sheet1!A1:B200", // 填入工作表名稱
    api_key = "AIzaSyAopwFo-HUJoueaUofacYDUeZGb2cSvQ5s", // 填入 API 金鑰
    url = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheet_id + "/values/" + tab_name + "?key=" + api_key;

  $(document).ready(function() {
    $("button").click(function() {
      $.getJSON(url, function(data) {
        var items = [];
        var count = data.values.length;
        alert(
          '一共抓取到 ' + count + '筆資料!!\n' +
          '下方顯示最近五筆設定鬧鈴\n' +
          "[" + data.values[0][0] + "]\t[" + data.values[0][1] + "]\n" +
          data.values[count - 5][0] + "\t" + data.values[count - 5][1] + "\n" +
          data.values[count - 4][0] + "\t" + data.values[count - 4][1] + "\n" +
          data.values[count - 3][0] + "\t" + data.values[count - 3][1] + "\n" +
          data.values[count - 2][0] + "\t" + data.values[count - 2][1] + "\n" +
          data.values[count - 1][0] + "\t" + data.values[count - 1][1]
        );

        $.each(data, function(key, val) {
          items.push('<li id="' + key + '">' + val + '</li>');
          // console.log(key + "," + val);
        });

        $('<ul/>', {
          'class': 'my-new-list',
          html: items.join('')
        }).appendTo('body');
      });
    });
  });
}
