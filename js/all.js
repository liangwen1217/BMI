
// 指定 dom
var userHeight = document.getElementById('userHeight');
var userWeight = document.getElementById('userWeight');
var BMIButton = document.getElementById('BMICount');
var BMIVaryShow = document.getElementById('BMIVary');
var showStatus = document.getElementById('showStatus');
var userResult = document.getElementById('userResult');

// 將 localStorage 內容以陣列形式讀取，若無內容則等於空陣列
var getLocalData = JSON.parse(localStorage.getItem('userData')) || [];

// 點擊計算
BMIButton.addEventListener('click', addData, false);
// 一進入網頁就讀取 localStorage
updateData(getLocalData);

// 計算 BMI 並傳至 localStorage
function addData() {

  // 取得輸入的內容，並轉換為 number 型別
  var BMIWeight = parseFloat(userWeight.value);
  // 使用 Math.pow(基數, 次方次數)，計算次方
  var BMIHeight = Math.pow(parseInt(userHeight.value) / 100, 2);
  // toFixed()是指定小數後幾位數，但傳回值為字串，以 parseFloat 可傳回小數點，parseInt 會傳回整數
  var userBMI = parseFloat((BMIWeight / BMIHeight).toFixed(2));

  // recordTime日期
  var today = new Date();
  var recordDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  // 判斷使用者是否符合格式，跳出警告
  if (isNaN(BMIHeight) || isNaN(BMIWeight)) {
    alert('請輸入身高與體重')

    return false

  } else if (userBMI <= 0) {
    alert('請輸入整數！');

    return false
  }

  // 判斷使用者的 Status 與 左方 border 顏色
  if (userBMI > 40) {
    // 傳至 localStorage 變數
    var userStatus = '重度肥胖';
    var userAlert = 'danger-Max';

    // 更改 按鈕狀態的樣式
    BMIVaryShow.style.border = '3px solid #FF1200';
    BMIVaryShow.style.color = '#FF1200';
    showStatus.textContent = userStatus;
    showStatus.style.color = '#FF1200';

  } else if (35 < userBMI && userBMI <= 40) {
    var userStatus = '中度肥胖';
    var userAlert = 'danger-Serious';
    BMIVaryShow.style.border = '3px solid #FF6C03';
    BMIVaryShow.style.color = '#FF6C03';
    showStatus.textContent = userStatus;
    showStatus.style.color = '#FF6C03';

  } else if (30 < userBMI && userBMI <= 35) {
    var userStatus = '輕度肥胖';
    var userAlert = 'danger-Middle';
    BMIVaryShow.style.border = '3px solid #FF6C03';
    BMIVaryShow.style.color = '#FF6C03';
    showStatus.textContent = userStatus;
    showStatus.style.color = '#FF6C03';

  } else if (25 < userBMI && userBMI <= 30) {
    var userStatus = '過重';
    var userAlert = 'danger-light';
    BMIVaryShow.style.border = '3px solid #FF982D';
    BMIVaryShow.style.color = '#FF982D';
    showStatus.textContent = userStatus;
    showStatus.style.color = '#FF982D';

  } else if (18.5 < userBMI && userBMI <= 25) {
    var userStatus = '理想';
    var userAlert = 'Ideal';
    BMIVaryShow.style.border = '3px solid #31BAF9';
    BMIVaryShow.style.color = '#31BAF9';
    showStatus.textContent = userStatus;
    showStatus.style.color = '#31BAF9';

  } else if (userBMI <= 18.5) {
    var userStatus = '過輕';
    var userAlert = 'thick';
    BMIVaryShow.style.border = '3px solid #86D73F';
    BMIVaryShow.style.color = '#86D73F';
    showStatus.textContent = userStatus;
    showStatus.style.color = '#86D73F';
  }

  // 設置 localStorage 格式
  var userData = {
    alertBorder: userAlert,
    status: userStatus,
    BMI: userBMI,
    weight: userWeight.value,
    height: userHeight.value,
    date: recordDate
  }
  // 將 userData 物件傳至 getLocalData 陣列
  getLocalData.push(userData);
  // 以字串型別傳至 localStorage
  localStorage.setItem('userData', JSON.stringify(getLocalData));
  // 將資料更新至網頁
  updateData(getLocalData);

  // 執行按鈕狀態更換
  BMIVary(getLocalData);
}


function updateData(items) {
  var str = '';
  var len = items.length;

  for (var i = 0; i < len; i++) {
    str += '<li class="d-flex justify-content-between align-items-center w-100' + ' ' + getLocalData[i].alertBorder + '"><h6 class="px-3">' + getLocalData[i].status + '</h6><p class="px-3">BMI <span class="content">' + getLocalData[i].BMI + '</span></p><p class="px-3">weight <span class="content">' + getLocalData[i].weight + 'kg</span></p><p class="px-3">height <span class="content">' + getLocalData[i].height + 'cm</span></p><p class="px-3"><span class="recordDate d-none d-md-block">' + getLocalData[i].date + '</span></p>';
  }

  userResult.innerHTML = str;

}


function BMIVary(items) {

  // 隱藏原本按鈕
  BMIButton.classList.toggle('d-none');

  // 加入使用者 BMI 狀態內容
  var len = items.length;

  for (var i = 0; i < len; i++) {
    BMIVaryShow.innerHTML = '<div class="d-flex flex-column justify-content-center h-100"><p class="m-0 text-center" style = "font-size: 32px" >' + getLocalData[i].BMI + '</p><p class="m-0 text-center" style="font-size: 14px">MBI</p><a id="reset" class="reset ' + getLocalData[i].alertBorder + '" href="#"></a></div >';
  }

  // 顯示使用者 BMI 狀態
  BMIVaryShow.classList.toggle('d-none');
  showStatus.classList.toggle('d-none');

  // reset 按鈕，監聽是否點擊
  var resetBtn = document.getElementById('reset');
  resetBtn.addEventListener('click', function () {
    BMIButton.classList.toggle('d-none');
    BMIVaryShow.classList.toggle('d-none');
    showStatus.classList.toggle('d-none');
    userHeight.value = '';
    userWeight.value = '';
  });

}