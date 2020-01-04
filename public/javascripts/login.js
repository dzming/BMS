$(() => {

    // let user = localStorage.getItem('token');

    // if(user.token){
    //     // 判断本地是否有token
    //     $.ajax({
    //         type: "POST",
    //         url: "http://localhost:3000/users/autoLogin",
    //         data: {
                
    //         },
    //         success(data) {
    //             resolve(data)
    //         }
    //     })
    // }


    let user = localStorage.getItem("token");
    if(user){
        $.ajax({
            type: "POST",
            data: {
                token: user
            },
            url: "http://localhost:3000/users/autoLogin",
            success(data) {
                console.log(data)
                if(data=="success"){
                    window.location.href = "dashboard.html"
                }
            }
        })
    }
    
    


    let signIn = $("#signIn");
    let login = (inputEmail, inputPassword) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/users/login",
                data: {
                    inputEmail,
                    inputPassword
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    signIn.click(async () => {
        let inputEmail = $("#inputEmail").val();
        let inputPassword = $("#inputPassword").val();
        let data = await login(inputEmail, inputPassword);

        let fn = {
            success() {
                console.log('登录成功');
                localStorage.setItem("uname", inputEmail);
                localStorage.setItem("token", data.token);
                window.location.href = "dashboard.html"
            },
            fail() {
                console.log('登录失败');
            },
            other(){
                
            }
        }
        fn[data.status]()
    })
})