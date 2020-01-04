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
                    <td><button class="updtzt btn btn-success btn-xs butn4">修改</button</td>
                </tr>            
            `
        }).join("");

        $("#listzt").html(html);

        $('.butn4').on('click', function () {
            $('#reviseUser4').css('display', 'block');
        })

        $('.quxiao4').on('click', function () {
            $('#reviseUser4').css('display', 'none');
        })

        $(".updtzt").on("click", function () {
            let _id = $(this).parent().parent()[0].cells[0].innerHTML;
            console.log(_id);
            $("#st4").on("click", function () {
                var numbers = $("#sName4").val();
                var condition = $("#sLink4").val();
                // console.log(name)
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/setting/updatezt",
                    data: {
                        _id,
                        numbers,
                        condition
                    },
                    success(data) {
                        console.log(data)
                        window.location.href = "goodszt.html"
                    }
                })
            })
        })
        

        
    })()



})