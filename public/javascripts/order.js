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

    let submit = $("#submit");

    submit.click(() => {
        
        $('#reviseUser').css('display', 'block');
        

        $('.quxiao').on('click', function () {
            $('#reviseUser').css('display', 'none');
        })

        $("#st").on("click",function(){
            let name = $("#name").val();
            let age = $("#age").val();
            let skill = $("#skill").val();
            let description = $("#description").val();
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/order",
                data: {
                    name,
                    age,
                    skill,
                    description
                },
                success(data) {
                    console.log(data)
                    location.href = "../order.html";
                }
            })
        })
        
    })
})