import Mock from 'mockjs';

Mock.mock('/api/login?id=1', (req, res) => {
    let time = Date.parse(new Date());
    return {
        "code": "200",
        "message": "success",
        "data": {
            "id": "1",
            "username": "admin",
            "password": "123456",
            "admin": "true",
            "time": time
        }
    }
});


Mock.mock('/api/loginIn', (req, res) => {
    let par = JSON.parse(req.body);
    let username = par.params.username;
    let password = par.params.password;
    let time = Date.parse(new Date());
    let roles = [];
    if(username == 'admin'){
        roles = ['admin']
    }else{
        roles = ['user']
    }
    return {
        "code": "200",
        "message": "success",
        "data": {
            "id": "222",
            "username": username,
            "password": password,
            "roles": roles,
            "time": time,
            "token": 'loginIntoken'
        }
    }
});

Mock.mock('/api/getUserInfo', (req, res) => {
    let par = JSON.parse(req.body);
    let token = par.params.token;
    return {
        "code": "200",
        "message": "success",
        "data": {
            "id": "222",
            "roles": ['admin']
        }
    }
});

Mock.mock('/api/form', (req, res) => {
    return {
        "code": "200",
        "message": "success",
        "data": {
            "id": "1111",
        }
    }
});

