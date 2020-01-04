$(() => {
    // a = Cookie.getCookie("uname");
    // console.log(a);
    // $("#uname").text(a);
    let uname = localStorage.getItem("uname");
    let _token = localStorage.getItem("token");
    if (!_token) {
        alert("未登录无法访问");
        window.location.href = "login.html"
    }
    $("#uname").html(localStorage.getItem("uname"));

    $("#out").on("click", function () {
        localStorage.clear();
        location.href = "./login.html";
        localStorage.removeItem("token");
    })

    let getUserList = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/findUsers",
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
            if (item.lv == 1) {
                return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.inputEmail}</td>
                    <td>${item.level}</td>
                    <td class="yc"></td>
                </tr>            
            `
            } else if (item.inputEmail == uname) {
                return `
                <tr>
                <td>${item._id}</td>
                <td>${item.inputEmail}</td>
                <td>${item.level}</td>
                <td class="yc"></td>
                </tr> 
                `
            } else {
                return `
                    <tr>
                        <td>${item._id}</td>
                        <td>${item.inputEmail}</td>
                        <td>${item.level}</td>
                        <td class="yc"><input class="btn-warning sc" type="button" value="删除"></td>
                    </tr>            
                `
            }

        }).join("");

        $("#list").html(html);

        $(".sc").on("click", function () {
            // console.log(name);
            let _id = $(this).parent().parent()[0].cells[0].innerHTML;
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/users",
                data: {
                    inputEmail: name
                },
                success(data) {
                    console.log(data)
                    if (data[0].lv == 1) {
                        var r = confirm("确定删除？");
                        if (r == true) {
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:3000/setting/dels",
                                data: {
                                    _id
                                },
                                success(data) {
                                    console.log(data)
                                }
                            })
                            window.location.href = "gl.html"
                        }
                    } else {
                        alert("非超级管理员无法进行此操作");
                    }
                }
            })

        })

        $(".cr").on("click", function () {
            $('#reviseUser').css('display', 'block');
            $('.quxiao').on('click', function () {
                $('#reviseUser').css('display', 'none');
            })

            $("#st").on("click", function () {
                var inputEmail = $("#sName").val();
                var inputPassword = $("#sLink").val();
                if (!inputEmail) {
                    alert("用户名不准为空")
                } else if (!inputPassword) {
                    alert("密码不准为空")
                } else {
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:3000/setting/orders",
                        data: {
                            inputEmail,
                            inputPassword,
                            level: "管理员",
                            lv: 2
                        },
                        success(data) {
                            console.log(data)
                            window.location.href = "gl.html"
                        }
                    })
                }
            })
        })
    })()

})