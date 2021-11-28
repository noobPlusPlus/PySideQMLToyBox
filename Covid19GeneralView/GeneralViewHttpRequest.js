function request(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState !== XMLHttpRequest.DONE)
            return;

        let jsonObject = JSON.parse(xhr.responseText.toString());
        if(jsonObject.msg !== "成功")
            return;

        let totalObject = jsonObject.data.chinaTotal.total
        let todayObject = jsonObject.data.chinaTotal.today
        let extDataObject = jsonObject.data.chinaTotal.extData

        infoRepeaterModel.get(0).total = totalObject.input;
        infoRepeaterModel.get(0).increase = todayObject.input;

        infoRepeaterModel.get(1).total = extDataObject.noSymptom;
        infoRepeaterModel.get(1).increase = extDataObject.incrNoSymptom;

        let totalConfirm = totalObject.confirm;
        infoRepeaterModel.get(3).total = totalConfirm;
        infoRepeaterModel.get(3).increase = todayObject.confirm;

        let totalDead = totalObject.dead;
        infoRepeaterModel.get(4).total = totalDead;
        infoRepeaterModel.get(4).increase = todayObject.dead;

        let totalHeal = totalObject.heal;
        infoRepeaterModel.get(5).total = totalHeal;
        infoRepeaterModel.get(5).increase = todayObject.heal;

        infoRepeaterModel.get(2).total = totalConfirm - totalDead - totalHeal;
        infoRepeaterModel.get(2).increase = todayObject.storeConfirm;
    }
    xhr.open("GET", "http://c.m.163.com/ug/api/wuhan/app/data/list-total");
    xhr.send();
}
