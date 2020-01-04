$(() => {
    let _token = localStorage.getItem("token");
    if(!_token){
        alert("未登录无法访问");
        window.location.href = "login.html"
    }
    $("#uname").html(localStorage.getItem("uname"));
    var name = localStorage.getItem("uname");
    $("#out").on("click", function () {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        Cookie.setCookie("uname", "", d, "/");
        location.href = "../login.html";
        localStorage.removeItem("token");
    })
    $("#sName").val(localStorage.getItem("uname"));


    let getUserList = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                data: {
                    inputEmail: name
                },
                url: "http://localhost:3000/setting/users",
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    (async () => {
        let data1 = await getUserList();
        // console.log(data);
        let html = data1.map((item, index) => {
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.inputEmail}</td>
                    <td>${item.level}</td>
                    <td><input type="password" value="${item.inputPassword}" disabled></td>
                    <td><button class="upd btn btn-success btn-xs butn">修改</button</td>
                </tr>            
            `
        }).join("");

        $("#list").html(html);

        $('.butn').on('click', function () {
            $('#reviseUser').css('display', 'block');
        })

        $('.quxiao').on('click', function () {
            $('#reviseUser').css('display', 'none');
        })

        $(".upd").on("click", function () {
            let _id = $(this).parent().parent()[0].cells[0].innerHTML;
            console.log(_id);
            $("#st").on("click", function () {
                
                var pwd = $("#sLink").val();
                // console.log(name)
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/setting/updates",
                    data: {
                        _id,
                        inputEmail:name,
                        inputPassword:pwd
                    },
                    success(data) {
                        console.log(data)
                        window.location.href = "glxg.html"
                    }
                })
            })



        })
    })()



})