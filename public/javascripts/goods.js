$(() => {
    let _token = localStorage.getItem("token");
    if(!_token){
        alert("未登录无法访问");
        window.location.href = "login.html"
    }
    $("#uname").html(localStorage.getItem("uname"));

    $("#out").on("click", function () {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        Cookie.setCookie("uname", "", d, "/");
        location.href = "../login.html";
        localStorage.removeItem("token");
    })



    let getUserList = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/findUserg",
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    (async () => {
        let data = await getUserList();
        // console.log(data);
        let html = data.map((item, index) => {
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.unames}</td>
                    <td>${item.goodsname}</td>
                    <td>${item.price}</td>
                    <td>${item.numbers}</td>
                    <td>${item.price * item.numbers}</td>
                    <td>${item.condition}</td>
                </tr>            
            `
        }).join("");

        $("#listzs").html(html);

        
        

        
    })()



})