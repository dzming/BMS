$(() => {
    // a = Cookie.getCookie("uname");
    // console.log(a);
    // $("#uname").text(a);
    9
    $("#uname").html(localStorage.getItem("uname"));
    let _token = localStorage.getItem("token");
    if(!_token){
        alert("未登录无法访问");
        window.location.href = "login.html"
    }
    $("#out").on("click", function () {
        localStorage.clear();
        location.href = "./login.html";
        localStorage.removeItem("token");
    })

    let getUserList = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/findUser",
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    (async () => {
        let data = await getUserList();
        console.log(data);
        let html = data.map((item, index) => {
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>${item.description}</td>
                </tr>            
            `
        }).join("");
        $("#list").html(html);
    })()
})