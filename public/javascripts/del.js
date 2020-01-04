$(() => {
    $("#uname").html(localStorage.getItem("uname"));
    let _token = localStorage.getItem("token");
    if(!_token){
        alert("未登录无法访问");
        window.location.href = "login.html"
    }
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
        let data = await getUserList();
        // console.log(data);
        let html = data.map((item, index) => {
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>${item.description}</td>
                    <td><button class="close">X</button</td>
                </tr>            
            `
        }).join("");
        $("#list").html(html);

        $(".close").on("click", function () {
            $('#reviseUser').css('display', 'block');
        

            $('.quxiao').on('click', function () {
                $('#reviseUser').css('display', 'none');
            })
            let _id = $(this).parent().parent()[0].cells[0].innerHTML;
            console.log(_id);
            $("#st").on("click",function(){
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/setting/del",
                    data: {
                        _id
                    },
                    success(data) {
                        console.log(data)
                    }
                })
                location.href = "../del.html"
            })
            
        })
    })()



})