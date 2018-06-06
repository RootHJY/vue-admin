import Mock from 'mockjs';

Mock.mock('/api/login?id=1', (req, res) => {
    return {
        "code": "200",
        "message": "success",
        "data": {
            "id": "1",
            "username": "admin",
            "password": "123456",
            "isMember": "true",
            "time": "122311123"
        }
    }
});


Mock.mock('/api/loginIn', (req, res) => {
    let par = JSON.parse(req.body);
    let username = par.params.username;
    let password = par.params.password;
    let time = Date.parse(new Date());
    return {
        "code": "200",
        "message": "success",
        "data": {
            "id": "222",
            "username": username,
            "password": password,
            "isMember": "true",
            "time": time
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

