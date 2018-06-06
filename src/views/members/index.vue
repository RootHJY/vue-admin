<template>
    <div class="hello">
        <el-table :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
    </div>
</template>
<script>
    import { _loginApi, _getUserList} from '@/api/api.js';
    export default { 
        name: 'member',
        data () {
            return {
                msg: "member",
                info: "a",
                id: "1",
                error: false,
                tableData2: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }, {
                     date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        },
        created() {
            this.getDate();
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                  return 'warning-row';
                } else if (rowIndex === 3) {
                  return 'success-row';
                }
                return '';
            },
            getDate() {
                let params = { "id" : this.id };
                _loginApi(params).then(data => {
                    if(data.code == '200'){
                        this.info = data.data;
                    }else{
                        this.error = true;
                    }
                })
            }
        }
    }
</script>
