import QtQuick 2.15
import QtQuick.Controls 2.12
import QtQuick.Layouts 1.15
import QtWebEngine 1.3
import QtWebChannel 1.0

import "./Covid19MapHttpRequest.js" as Covid19MapHttpRequest

Item {
    QtObject {
        id: webObject
        WebChannel.id: "webObject"
        signal setData(string chinaDailyData, string updateTime);
        function pageLoadFinished(){
            Covid19MapHttpRequest.request()
        }
    }

    WebEngineView {
        width:1000;
        anchors.centerIn: parent
        id:webview
        anchors.fill: parent
        url: "map.html"
        webChannel: channel
    }

    WebChannel {
        id: channel
        registeredObjects: [webObject]
    }
}
