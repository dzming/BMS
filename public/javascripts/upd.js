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
                url: "http://localhost:3000/setting/findUser",
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
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>${item.description}</td>
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
                var name = $("#sName").val();
                var age = $("#sLink").val();
                var skill = $("#sOrd").val();
                var description = $("#sKnot").val();
                // console.log(name)
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/setting/update",
                    data: {
                        _id,
                        name,
                        age,
                        skill,
                        description
                    },
                    success(data) {
                        console.log(data)
                        window.location.href = "update.html"
                    }
                })
            })



        })
    })()



})