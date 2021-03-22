"use strict";
let keyArr = [];
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
Horns.prototype.cloneRender = function () {
    let clonedDiv = $(".photo-template").clone();
    clonedDiv.find("h2").text(this.title);
    clonedDiv.find("p").text(this.description);
    clonedDiv.find("img").attr("src", this.image_url);
    clonedDiv.removeClass("photo-template");
    clonedDiv.attr("class", this.keyword);
    $("section").append(clonedDiv);
};

const ajaxSettings = {
    method: "get",
    dataType: "json",
};

$.ajax("data/page-1.json", ajaxSettings).then((data) => {
    data.forEach((horn) => {
        let hornObject = new Horns(horn);
        // render the create horn object
        hornObject.cloneRender();
    });
    let optEl;
    for (let i = 0; i < keyArr.length; i++) {
        optEl = document.createElement("option");
        optEl.setAttribute('value', keyArr[i]);
        optEl.textContent = keyArr[i];
       $('#sel').append(optEl)

    }
    $('#sel').on("change",function(){

       $('div').css("display","none");
       let str=$('#sel').val();
       for(let i=0;i<keyArr.length;i++)
       {
        
        if(keyArr[i]===str);
        {
            $('.'+str).css("display","block");
        }
       }
    });
});

