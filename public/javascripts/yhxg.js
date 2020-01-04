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
                url: "http://localhost:3000/setting/findUserq",
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
                    <td>${item.uname}</td>
                    <td>${item.upwd}</td>
                    <td><button class="delt btn-success btn-xs btn-green">删除</button</td>
                    <td><button class="updt btn btn-success btn-xs butn">修改</button</td>
                </tr>            
            `
        }).join("");

        $("#lists").html(html);

        $('.butn').on('click', function () {
            $('#reviseUser').css('display', 'block');
        })

        $('.quxiao').on('click', function () {
            $('#reviseUser').css('display', 'none');
        })

        $(".updt").on("click", function () {
            let _id = $(this).parent().parent()[0].cells[0].innerHTML;
            console.log(_id);
            $("#st2").on("click", function () {
                var uname = $("#sName2").val();
                var upwd = $("#sLink2").val();
                // console.log(name)
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/setting/updatey",
                    data: {
                        _id,
                        uname,
                        upwd
                    },
                    success(data) {
                        console.log(data)
                        window.location.href = "yhxg.html"
                    }
                })
            })
        })
        $(".delt").on("click", function () {
            console.log(666)
            let _id = $(this).parent().parent()[0].cells[0].innerHTML;

            var r = confirm("确定删除？");
            if (r == true) {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/setting/dely",
                    data: {
                        _id
                    },
                    success(data) {
                        console.log(data)
                    }
                })
                location.href = "../yhxg.html"
            }
            else {
                alert("已取消操作！");
            }

        })

        $(".cr2").on("click", function () {
            $('#reviseUser2').css('display', 'block');
            $('.quxiao2').on('click', function () {
                $('#reviseUser2').css('display', 'none');
            })

            $("#st3").on("click", function () {
                console.log(66);
                var uname = $("#sName3").val();
                var upwd = $("#sLink3").val();
                if (!uname) {
                    alert("用户名不准为空");
                } else if (!upwd) {
                    alert("密码不准为空");
                } else {
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:3000/setting/ordersy",
                        data: {
                            uname,
                            upwd
                        },
                        success(data) {
                            console.log(data)
                            alert("添加成功");
                            window.location.href = "yhxg.html"
                        }
                    })
                }
            })
        })
    })()



})