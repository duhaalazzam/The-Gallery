"use strict";
let keyArr = [];
let objArr1=[];
let objArr2=[];
function Horns(horn) {
    this.image_url = horn.image_url;
    this.title = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns;
    if (!keyArr.includes(this.keyword)) {
        keyArr.push(this.keyword);
    }
}

// Using a clone
Horns.prototype.renderWithMustache1 = function () {
    let template = $("#neighborhood-template").html();
  // Use mustache render function ro render the new HTML and we are going to merge it with the selected template
  let html = Mustache.render(template, this);

  // last step is to append it
  $("#neighborhoods").append(html);
};
Horns.prototype.renderWithMustache2 = function () {
    let template = $("#neighborhood-template2").html();
  // Use mustache render function ro render the new HTML and we are going to merge it with the selected template
  let html = Mustache.render(template, this);

  // last step is to append it
  $("#neighborhoods2").append(html);
};

const ajaxSettings = {
    method: "get",
    dataType: "json",
};

$.ajax("data/page-1.json", ajaxSettings).then((data) => {
    data.forEach((horn) => {
        let hornObject = new Horns(horn);
        // render the create horn object
        objArr1.push(hornObject);
        // hornObject.renderWithMustache1();
    });
    let optEl;
    for (let i = 0; i < keyArr.length; i++) {
        optEl = document.createElement("option");
        optEl.setAttribute('value', keyArr[i]);
        optEl.textContent = keyArr[i];
       $('#sel').append(optEl)

    }
    $('#sel').on("change",function(){

       $('#neighborhoods div').css("display","none");
       let str=$('#sel').val();
       for(let i=0;i<keyArr.length;i++)
       {
        
        if(keyArr[i]===str);
        {
            $('.'+str).css("display","block");
        }
       }
    });
    objArr1.sort(compareFunction2);
    objArr1.forEach((horn)=>{
        horn.renderWithMustache1();
        //console.log(horn);
    });
});
$.ajax("data/page-2.json", ajaxSettings).then((data) => {
    data.forEach((horn) => {
        let hornObject = new Horns(horn);
        // render the create horn object
        objArr2.push(hornObject);
        // hornObject.renderWithMustache2();

    });
    let optEl;
    for (let i = 0; i < keyArr.length; i++) {
        optEl = document.createElement("option");
        optEl.setAttribute('value', keyArr[i]);
        optEl.textContent = keyArr[i];
       $('#sel2').append(optEl)

    }
    $('#sel2').on("change",function(){

       $('#neighborhoods2 div').css("display","none");
       let str=$('#sel2').val();
       for(let i=0;i<keyArr.length;i++)
       {
        
        if(keyArr[i]===str);
        {
            $('.'+str).css("display","block");
        }
       }
    });
    objArr2.sort(compareFunction1);
    objArr2.forEach((horn)=>{
    horn.renderWithMustache2();
     });
});

$('#page2').on('click',function(event)
{
    // 
  event.preventDefault(); 
  $('#neighborhoods2,#sel2').css("display","block");
  $('#neighborhoods,#sel').css("display","none");

})
$('#page1').on('click',function(event)
{
    // 
  event.preventDefault(); 
  $('#neighborhoods2,#sel2').css("display","none");
  $('#neighborhoods,#sel').css("display","block");

})
// console.log(objArr1);
// console.log(objArr2);
function compareFunction1(a, b) {
  if (a['horns'] < b['horns']) {
    return -1;
  }

  if (a['horns'] > b['horns']) {
    return 1;
  }

  return 0;
}
// console.log(objArr1);
function compareFunction2(a, b) {
    if (a['title'].toLowerCase() < b['title'].toLowerCase()) {
      return -1;
    }
  
    if (a['title'].toLowerCase() > b['title'].toLowerCase()) {
      return 1;
    }
  
    return 0;
  }
