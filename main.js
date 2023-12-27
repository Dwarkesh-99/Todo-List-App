let allData = [];
let newId = 0;
let val;
let itemId;
let fontName;
let div;
let recycleArr = [];

$(document).ready(function () {
  $("#searchBox").hide();
});
setTimeout(fetchData, 2000);

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    // document.querySelector("body").style.visibility = "hidden";
    document.getElementById("modalStart").click();
    if (localStorage.getItem(this.fontName) !== null) {
      document.getElementById("body").style.fontFamily = localStorage.getItem(
        this.fontName
      );
    }
  } else {
    // document.querySelector("body").style.visibility = "visible";
  }
};

//Function to hide/show search box..
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("body").onclick = function (e) {
    if (
      e.target === document.getElementById("clkSearch") ||
      e.target === document.getElementById("basic-addon1 1")
    ) {
      document.getElementById("basic-addon1 1").style.display = "none";
      $("#searchBox").show("slow");
      document.getElementById("searchBox").focus();
      return;
    } else if (e.target != document.getElementById("searchBox")) {
      // console.log(document.getElementById("searchBox").value);
      if (document.getElementById("searchBox").value === "") {
        $("#searchBox").hide("slow");
        document.getElementById("basic-addon1 1").style.display = "";
      }
    }
  };
});

//Function to change Font..
function fontChange(font) {
  localStorage.setItem(this.fontName, font);
  let bodyFont = document.getElementById("body");
  bodyFont.style.fontFamily = font;
}

//Function to search in array..
function searchInData(value) {
  let newArr = [];
  if (value === "") {
    document.getElementById("sorted").disabled = false;
    document.getElementById("addBtn").hidden = false;
    showArrData();
    return;
  }
  document.getElementById("sorted").disabled = true;
  const searchInput = value.toLowerCase();
  let results = allData.filter((obj) => {
    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        obj[key].toString().toLowerCase().includes(searchInput)
      ) {
        return true;
      }
    }
    return false;
  });
  // console.log(results);
  document.getElementById("demo").innerHTML = results.length + " notes";
  let list = document.getElementById("mylist");
  let clickAdd = document.getElementById("clickAdd");
  if (results.length <= 0) {
    document.getElementById("noData").hidden = false;
    document.getElementById("addBtn").hidden = true;

    clickAdd.innerHTML = `No <i class="bi bi-search"></i> Found for "${value}"..!`;
    list.innerHTML = ``;
    return;
  }
  document.getElementById("noData").hidden = true;
  document.getElementById("addBtn").hidden = false;
  clickAdd.innerHTML = `click <i class="bi bi-pencil-square"></i> to add Data`;
  showAnotherArrData(results, "search");
}

function showRecycleArrData() {
  let list1 = document.getElementById("mylist");
  let clickAdd = document.getElementById("clickAdd");
  document.getElementById(
    "head"
  ).innerHTML = `<img src="https://downloadr2.apkmirror.com/wp-content/uploads/2023/02/76/63e7ec06854e6.png" alt="app logo" style="border-bottom-left-radius: 10px; border-top-right-radius: 10px; width:2rem; justify-content-center; border:1px solid black" class="mx-2">&nbsp;Recycle bin`;
  document.getElementById("badgeRecycle").innerHTML = recycleArr.length;
  document.getElementById("demo").innerHTML = recycleArr.length + " notes";
  document.getElementById("basic-addon1 1").hidden = true;
  document.getElementById("sorted").hidden = true;
  document.getElementById("addBtn").hidden = true;
  document.getElementById("trash").hidden = false;
  document.getElementById("restore").hidden = false;
  document.getElementById("noteItemActive").className = "dropdown-item";
  document.getElementById("binItemActive").className = "dropdown-item active";

  if (recycleArr.length <= 0) {
    document.getElementById("noData").hidden = false;
    document.getElementById("trash").disabled = true;
    document.getElementById("restore").disabled = true;

    clickAdd.innerHTML = `Your bin is empty ..!`;
    list1.innerHTML = ``;
    return;
  }
  document.getElementById("noData").hidden = true;
  document.getElementById("trash").disabled = false;
  document.getElementById("restore").disabled = false;
  clickAdd.innerHTML = `click <i class="bi bi-pencil-square"></i> to add Data`;
  showAnotherArrData(recycleArr, "recycle");
}

function allNoteData() {
  let list2 = document.getElementById("mylist");
  document.getElementById(
    "head"
  ).innerHTML = `<img src="https://downloadr2.apkmirror.com/wp-content/uploads/2023/02/76/63e7ec06854e6.png" alt="app logo" style="border-bottom-left-radius: 10px; border-top-right-radius: 10px; width:2rem; justify-content-center; border:1px solid black" class="mx-2">&nbsp;All notes`;
  document.getElementById("basic-addon1 1").hidden = false;
  document.getElementById("sorted").hidden = false;
  document.getElementById("addBtn").hidden = false;
  document.getElementById("trash").hidden = true;
  document.getElementById("restore").hidden = true;
  clickAdd.innerHTML = `click <i class="bi bi-pencil-square"></i> to add Data`;
  document.getElementById("noteItemActive").className = "dropdown-item active";
  document.getElementById("binItemActive").className = "dropdown-item";
  showArrData();
}

function showAnotherArrData(results, str) {
  let click;
  let target;
  if (str === "recycle") {
    click = "";
    target = "#";
  } else {
    click = "openNote(this.id)";
    target = "#offcanvasScrolling";
  }
  let list3 = document.getElementById("mylist");
  list3.innerHTML = ``;
  results.forEach((item) => {
    let div = document.createElement("div");
    div.className = "mb-2 col-sm-4";
    div.style = "max-width:50%";
    div.innerHTML = `<div class="card" style="outline: none;" tabindex="0" role="button" id="${item.Id}" data-bs-toggle="offcanvas" data-bs-target=${target} aria-controls="offcanvasScrolling" onclick=${click}>
 							<div class="card-body">
 								<h5 class="card-title" style="text-overflow: ellipsis; white-space: nowrap; overflow:hidden;">${item.Title}</h5>
 								<p class="card-text" style="height: 4.5rem; overflow:hidden;">${item.Message}</p>
 							</div>
 							<div class="card-footer">
 							</div>
 						 </div>`;

    list3.appendChild(div);
  });
  $("#staticBackdrop").modal("hide");
}

function trashAll() {
  recycleArr = [];
  setTimeout(showRecycleArrData, 500);
}

function restoreAll() {
  recycleArr.forEach((element) => allData.push(element));
  allData.sort();
  recycleArr = [];
  document.getElementById("badgeNotes").innerHTML = allData.length;
  setTimeout(showRecycleArrData, 500);
}

//Function to sort data in asc/desc..
function sortData() {
  let data = document.getElementById("sorts");
  if (data.title === "down") {
    data.className = "bi bi-sort-up fa-md text-secondary";
    data.title = "up";
  } else {
    data.className = "bi bi-sort-down fa-md text-secondary";
    data.title = "down";
  }
  allData.reverse();
  showArrData();
}

//Function to open sidebar to add new data..
function openSideBar() {
  let mode = document.getElementById("floatingPassword");
  let mode1 = document.getElementById("priority");
  let mode2 = document.getElementById("mode");
  let note = document.getElementById("note");
  let btnBook = document.getElementById("bookBtn");
  let btnEdit = document.getElementById("editBtn");
  let btn03 = document.getElementById("btn03");
  let btn04 = document.getElementById("btn04");
  let btn01 = document.getElementById("btn01");
  let btn02 = document.getElementById("btn02");

  btn01.style = "";
  btn02.style = "";
  btnBook.style.display = "block";
  btnEdit.style.display = "none";
  btn03.style.display = "none";
  btn04.style.display = "none";
  note.style.display = "block";
  note.innerHTML = `Write Note here <i class="bi bi-pencil-square"></i>`;
  mode.readOnly = false;
  mode1.disabled = false;
  mode2.readOnly = false;
  mode2.style = "height: 22rem;";
  mode.style = "cursor: text;";

  setTimeout(focusFun, 400);
  clearData();
}

function focusFun() {
  let mode2 = document.getElementById("mode");
  mode2.focus();
}


//Function to delete specific data on user's action..
function deleteNote() {
  let del = allData.splice(this.val, 1);
  recycleArr.push(...del);
  // console.log(recycleArr);
  showArrData();
}

//Function to edit specific data on user's action..
function clkEdit() {
  let mode1 = document.getElementById("floatingPassword");
  let mode2 = document.getElementById("mode");
  let mode3 = document.getElementById("priority");
  let btn03 = document.getElementById("btn03");
  let editBtn = document.getElementById("editBtn");
  mode1.readOnly = false;
  mode2.readOnly = false;
  mode3.disabled = false;
  mode1.style = "cursor: text";
  mode2.style = "height: 22rem";
  btn03.disabled = false;
  editBtn.disabled = true;
  mode2.focus();
}

//Function to update specific data on user change the data..
function modifyData() {
  let mode1 = document.getElementById("floatingPassword");
  let mode2 = document.getElementById("mode");
  let mode3 = document.getElementById("priority");
  let btn03 = document.getElementById("btn03");
  // console.log(allData[this.val]);
  allData[this.val].Title = mode1.value;
  allData[this.val].Message = mode2.value;
  allData[this.val].Priority = mode3.value;
  document.getElementById("myCheck").click();
  btn03.disabled = true;
  showArrData();
}

//Function to open note in full view..
function openNote(id) {
  this.itemId = id;
  let obj = {};
  allData.forEach((item) => {
    if (item.Id === id) {
      // console.log(item);
      this.val = allData.indexOf(item);
      obj = item;
    }
  });
  // console.log(this.val);
  let note = document.getElementById("note");
  let btnEdit = document.getElementById("editBtn");
  let btnBook = document.getElementById("bookBtn");
  let mode1 = document.getElementById("floatingPassword");
  let mode2 = document.getElementById("mode");
  let mode3 = document.getElementById("priority");
  let btn03 = document.getElementById("btn03");
  let btn04 = document.getElementById("btn04");
  let btn01 = document.getElementById("btn01");
  let btn02 = document.getElementById("btn02");
  btn01.style.display = "none";
  btn02.style.display = "none";
  btn03.style = "";
  btn04.style = "";
  note.style.display = "none";
  btnEdit.style.display = "block";
  btnBook.style.display = "none";
  mode1.value = obj.Title;
  mode2.value = obj.Message;
  mode3.value = obj.Priority;
  mode1.style = "box-shadow: none;";
  mode2.style = "height: 22rem; box-shadow: none; border: 1px solid #0000000f;";
  btnEdit.disabled = false;
  btn03.disabled = true;
  mode1.readOnly = true;
  mode2.readOnly = true;
  mode3.disabled = true;
}

//
function changeMode() {
  let mode = document.getElementById("mode");
  let mode1 = document.getElementById("floatingPassword");
  let mode2 = document.getElementById("note");
  let mode3 = document.getElementById("priority");

  if (mode.title === "Write_Mode") {
    mode.readOnly = true;
    mode.style =
      "height: 22rem; box-shadow: none; border: 1px solid #0000000f;";
    mode.title = "Read_Mode";
    mode1.readOnly = true;
    mode1.style = "box-shadow: none;";
    document.getElementById("btn01").disabled = true;
    document.getElementById("btn02").disabled = true;
    mode2.innerHTML = `ReadMode Enable <i class="bi bi-file-text"></i> `;
    mode3.disabled = true;
  } else {
    mode.readOnly = false;
    mode.style = "height: 22rem;";
    mode.title = "Write_Mode";
    mode1.readOnly = false;
    mode1.style = "cursor: text;";
    document.getElementById("btn01").disabled = false;
    document.getElementById("btn02").disabled = false;
    mode2.innerHTML = `Write Note here <i class="bi bi-pencil-square"></i>`;
    mode3.disabled = false;
    mode.focus();
  }
}

function clearData() {
  let val1 = document.getElementById("floatingPassword");
  let val2 = document.getElementById("mode");
  let val3 = document.getElementById("priority");

  val1.value = "";
  val2.value = "";
  val3.selectedIndex = 0; // Reset all form data
  return false; // Prevent page refresh
}

//Function to fetch data from api and show them...
function fetchData() {
  fetch("https://656d6608bcc5618d3c231d07.mockapi.io/fake_todoApi")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Assign the fetched data to the variable
      allData = data;
      allData.sort();
      showArrData();
      // Handle the data received from the API
      // console.log("Data from API:", allData);
    })
    // Catch the problem if data not received from the API
    .catch((error) => {
      document.getElementById("noData").hidden = false;
      $("#staticBackdrop").modal("hide");
      console.error("Fetch error:", error);
    });
}

//Function to show data(note) in card design format...
function showArrData() {
  let list = document.getElementById("mylist");
  let lenArr = allData.length;
  document.getElementById("badgeRecycle").innerHTML = recycleArr.length;
  document.getElementById("badgeNotes").innerHTML = lenArr;
  document.getElementById("demo").innerHTML = lenArr + " notes";
  if (lenArr <= 0) {
    document.getElementById("noData").hidden = false;
    list.innerHTML = ``;
    return;
  }
  document.getElementById("noData").hidden = true;
  list.innerHTML = ``;
  allData.forEach((item) => {
    this.newId = parseInt(item.Id);
    let div = document.createElement("div");
    div.className = "mb-2 col-sm-4";
    div.style = "max-width:50%";
    div.innerHTML = `<div class="card" style="outline: none;" tabindex="0" role="button" id="${item.Id}" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" onclick="openNote(this.id)">
							<div class="card-body">
								<h5 class="card-title text-center" style="text-overflow: ellipsis; white-space: nowrap; overflow:hidden;">${item.Title}</h5><hr>
								<p class="card-text" style="height: 4.5rem; overflow:hidden;">${item.Message}</p>							
							</div>
							<div class="card-footer">
							</div>
						 </div>`;

    list.appendChild(div);
    $("#staticBackdrop").modal("hide");
  });
  clearData();
}

//Function to add data to array/add note...
function addData() {
  let val2 = document.getElementById("mode");
  if (val2.value.trim() === "" || val2.value === null) {
    val2.attributes.required = "required";
    val2.focus();
    return;
  }
  let id1 = (this.newId + 1).toString();
  let title = document.getElementById("floatingPassword");
  if (title.value.trim() === "" || title.value === null) {
    title.value = "#";
  }
  let msg = document.getElementById("mode");
  let priority = document.getElementById("priority");
  let newObjData = {
    Title: title.value,
    Message: msg.value,
    Priority: priority.value,
    Id: id1,
  };
  // console.log(newObjData);
  allData.push(newObjData);
  document.getElementById("myCheck").click();
  showArrData();
}
