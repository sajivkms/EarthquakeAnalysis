function cl1() {
    clearAndActive(0)
    $("#world").css("display","block")
    $("#area").css("display","none")
    $("#sbar").css("display","none")
    $("#stacked-bar").css("display","none")
    $("#controls").css("display","none")
    $("#world-text").css("display","block")
    $("#area-text").css("display","none")
    $("#sbar-text").css("display","none")
    $("#world-controls").css("display","block")
    $("#controls-area").css("display","none")
    $("#controls-bar").css("display","none")
    $("#controls-stack").css("display","none")
    $("#stacked-text").css("display","none")
    $("#scale").css("display","none")
    $("#area-header").css("display","none")

}

function cl2() {
    clearAndActive(1)
    $("#world").css("display","none")
    $("#area").css("display","block")
    $("#sbar").css("display","none")
    $("#stacked-bar").css("display","none")
    $("#controls").css("display","none")
    $("#world-text").css("display","none")
    $("#area-text").css("display","block")
    $("#sbar-text").css("display","none")
    $("#world-controls").css("display","none")
    $("#controls-area").css("display","block")
    $("#controls-bar").css("display","none")
    $("#stacked-text").css("display","none")
    $("#controls-stack").css("display","none")
    $("#scale").css("display","none")
    $("#area-header").css("display","block")



}

function cl3() {
    clearAndActive(2)
    $("#world").css("display","none")
    $("#area").css("display","none")
    $("#sbar").css("display","block")
    $("#stacked-bar").css("display","none")
    $("#controls").css("display","none")
    $("#world-text").css("display","none")
    $("#area-text").css("display","none")
    $("#sbar-text").css("display","block")
    $("#world-controls").css("display","none")
    $("#stacked-text").css("display","none")
    $("#controls-area").css("display","none")
    $("#controls-bar").css("display","block")
    $("#controls-stack").css("display","none")
    $("#scale").css("display","none")
    $("#area-header").css("display","none")


}

function cl4() {
    clearAndActive(3)
    $("#world").css("display","none")
    $("#area").css("display","none")
    $("#stacked-bar").css("display","block")
    $("#stacked-text").css("display","block")
    $("#sbar").css("display","none")
    $("#controls").css("display","none")
    $("#world-text").css("display","none")
    $("#area-text").css("display","none")
    $("#sbar-text").css("display","none")
    $("#world-controls").css("display","none")
    $("#controls-area").css("display","none")
    $("#controls-bar").css("display","none")
    $("#controls-stack").css("display","block")
    $("#scale").css("display","block")
    $("#area-header").css("display","none")


}

function cl5() {
    clearAndActive(4)
    $("#world").css("display","block")
    $("#area").css("display","block")
    $("#stacked-bar").css("display","block")
    $("#stacked-text").css("display","none")
    $("#sbar").css("display","block")
    $("#controls").css("display","block")
    $("#world-text").css("display","none")
    $("#area-text").css("display","none")
    $("#sbar-text").css("display","none")
    $("#world-controls").css("display","none")
    $("#controls-area").css("display","none")
    $("#controls-bar").css("display","none")
    $("#controls-stack").css("display","none")
    $("#scale").css("display","none")
    $("#area-header").css("display","none")


}

function clearAndActive(id) {
    var cList = document.getElementById("pag").getElementsByTagName("li");
    var ele = cList[id]
    for (let i = 0; i < cList.length; i++) {
        const element = cList[i];
        $(element).removeClass("active")        
    }
    $(ele).toggleClass("active")
}
cl1()