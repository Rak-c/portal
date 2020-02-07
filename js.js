document.getElementById("extra-btn").addEventListener("click", function () {
  var node = document.createElement("div");
  var clone = document.getElementById("selectors-section").cloneNode(true);
  node.appendChild(clone);
  document.getElementById("data-section").appendChild(node);
});

document.getElementById("request-date").value = TodayDate();
var selectYear = document.getElementById("select-year");
var d = new Date();
var n = d.getFullYear();
for (let index = n; index >= 1950; index--) {
  var option = document.createElement("option");
  option.text = index;
  selectYear.add(option);
}
$("input").prop('required', true);
$(function () {
  var inputs = document.getElementsByTagName("INPUT");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].oninvalid = function (e) {
      e.target.setCustomValidity("");
      if (!e.target.validity.valid) {
        e.target.setCustomValidity(e.target.getAttribute("data-error"));
      }
    };
  }
});
// $(document).ready(function () {
//   $("form").change(function () {
//     console.log(
//       $(this)
//       .closest("form")
//       .serialize()
//     );
//   });
// });

document.getElementById("form").onsubmit = function (e) {
  e.preventDefault();
  let list = [];
  let br = 0;
  $("select").each(function () {
    if (br == 3) {
      list.push("<br>");
      br = 0;
    }
    if (br == 0) {
      list.push("المنطقة: ");
      list.push(' ' + $(this).val() + ',')
    } else if (br == 1) {
      list.push("الصف: ");
      list.push(' ' + $(this).val() + ',')
    } else if (br == 2) {
      list.push("السنة: ");
      list.push(' ' + $(this).val() + '.')
    }
    list.push("&nbsp;");
    br++;
  })
  console.log(list.join(""))
  var body = `<h2 style="text-align:center;">استمارة طالب</h2>
  <p style="font-size:20px; font-weight:500; letter-spacing: 1px;">
  المقدم: ${$("#sname").val()}` + '<br>' + `التاريخ: ${TodayDate()}` +
    '<br>' + `الهاتف: ${$("#sphone").val()}` + '<br>' + `الطالب: ${$("#student-name").val()}` +
    '<br>' + `المدرسة: ${$("#school-name").val()}` +
    '<br>' + `${list.join("")}
  </p>`;
  Email.send({
    SecureToken: "375103b8-b11b-4107-b24e-5f89797e1850",
    To: "chcrak@gmail.com",
    From: "chcrak@gmail.com",
    Subject: `طلب التسلسل الدراسي لـ: ${$("#student-name").val()}`,
    Body: `<div style="letter-spacing: 1px;
    border-right: 6px solid #323130;
    background-color:rgba(0, 0, 0, 0.01);
    position:absolute; right:0; display: inline-block;
    padding:20px !important; border-radius: 10px!important; font-family: 'Calibri', sans-serif;
    color:#323130;" dir="rtl">${body}</div>`
  }).then((message) => {
    if (message == "OK") {
      $("#main").addClass("blur");
      $("#main2").removeClass("hide");
      $("#overlay").addClass("disable")
      $("html").css("overflow", "hidden");
    } else {
      $("#main").addClass("blur");
      $("#main4").removeClass("hide");
      $("#overlay").addClass("disable")
      $("html").css("overflow", "hidden");
    }
    document.getElementById("form").reset();
  });
};

function TodayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return today = mm + '/' + dd + '/' + yyyy;

}
